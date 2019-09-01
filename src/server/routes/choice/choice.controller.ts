import { Request, Response } from 'express';

import models from '../../models/index';

interface IPostObject {
  demographicMatch?: boolean;
  submissionLength?: number;
  orderChangeLength?: number;
  lengthOfAdjectivesPossible?: number;
  correspondingID?: string;
}
interface IMaleFemale {
  male?: {
    [key: string]: any;
  };
  female?: {
    [key: string]: any;
  };
  recent?: {
    [key: string]: any;
  };
}

const getWordCount = (arr: any, map: any) => {
  // @ts-ignore
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    map[item] = (map[item] + 1) || 1;
  }
  return map;
};

const controller = {
  getNew: async ( req: Request, res: Response ) => {
    // in here I need to return the last submission and then add the result to it
    // first lets render the two different options;
    // next step is to then check if there are two from each demographic;
    const length = await models.Data.countDocuments();
    const maleFemale: IMaleFemale = {};
    const data = await models.Data.find( (error, response) => {
      if (error) {
        console.error('finding documents', error);
      }
      maleFemale.recent = response;
    }).sort({ _id: -1 }).limit(1);
    const male = await models.Data.aggregate( [
      { $match: { demographic: 'male' } },

      { $sample: { size: 5 } },

    ] , ( error: any, docs: any ) => {
      if (error) {
        console.error('aggregate male went wrong', error);
      }
      return docs;
    } );
    const female = await models.Data.aggregate( [
      { $match: { demographic: 'female' } },

      { $sample: { size: 5 } },

    ] , ( error: any, docs: any ) => {
      if (error) {
        console.error('aggregate female went wrong', error);
      }
      return docs;
    } );

    maleFemale.male = male;
    maleFemale.female = female;

    return await res.send(maleFemale);

  },
  postName: async ( req: Request, res: Response ) => {

    const body = req.body;

    const dataObject = new models.FinalResult();
    const wordsObject = new models.Words();
    // This is the demographic from the two chosen responses;
    const chosenDemographic = body.demographic;
    await models.Data.findOne({}, {}, { sort: { _id : -1 } }, (error, response) => {
      if (error) {
        console.error('Cannot find corresponding ID', error);
      }
      if ( response ) {
        // demographic from the drop down
        const actualDemographic = response.demographic;
        // original string
        const original = response.originalString;
        // length of the original string
        const lengthOfOriginal = original.length;
        // how many adjectives possible
        const lengthOfAdjectivesPossible = response.length;
        // how many adjectives can be changed
        const lengthOfChangedWords = response.orderOfWords.length;
        if ( actualDemographic === chosenDemographic ) {
          // if the chosen demographic matches the users demographic
          dataObject.demographicMatch = true;
        } else {
          dataObject.demographicMatch = false;
        }
        // length of advert
        dataObject.submissionLength = lengthOfOriginal;
        // the amount of words changed
        dataObject.orderChangeLength = lengthOfChangedWords;
        // the amount of words that can be changed
        dataObject.lengthOfAdjectivesPossible = lengthOfAdjectivesPossible;
        // ID of the document that contained the original data in
        dataObject.correspondingID = response._id;

        wordsObject.demographic = actualDemographic;
        wordsObject.words = response.orderOfWords;

      }
    }).then((resProm: any) => {

      const createDictionary = ( responseData: any ) => {
        if (responseData) {
          const words = responseData.words;
          console.log(words, 'words inside');
          const wordDictionary = getWordCount(wordsObject.words, words);
          wordsObject.words = wordDictionary;
        } else {
          const words = {};
          const wordDictionary = getWordCount(wordsObject.words, words);
          wordsObject.words = wordDictionary;
        }
      };

      const neededDemo =  wordsObject.demographic;
      console.log(neededDemo);
      models.Words
        .findOne({ demographic: neededDemo }, async ( error: any, response: any ) => {
            if ( error ) {
              console.error('finding words document', error);
            }
            if ( await response ) {
              createDictionary( response );

              await models
                .Words.deleteOne( { demographic: wordsObject.demographic }, ( err: any ) => {
                  if (!err) {
                    console.log('deleted');
                  } else {
                    console.error( 'cant delete', err );
                  }
              } );
              await wordsObject.save( (er: string) => {
                if (er) { console.error('didnt save', er); }
                console.log('words saved');
                console.log(wordsObject, 'object that was saved');
              } );
            } else {
              console.log(response, 'response is empty');
              createDictionary( response );
              await wordsObject.save( (er: string) => {
                if (er) { console.error('didnt save', er); }
                console.log('words saved');
              } );
            }
      });
    });

    dataObject.save( (error: string) => {
      if (error) { console.log(error); }
      console.log('final result saved');
    } );
    return res.send( { status: 301 } );
  },
};

export default controller;

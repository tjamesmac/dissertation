import { Request, Response } from 'express';

import models from '../../models/index';

interface IWordResult {
  words?: object[];
  demographic?: string;
}

const controller = {
  getData: async ( req: Request, res: Response ) => {
    console.log('i am in the new controller');
    const wordModelObj: any = {};
    const dataModelObj: any = {};
    const combinedObj: any = {};
    // return the data from the word collection;
    await models.Words.find( {}, ( error: any, response: any ) => {
      if (error) { console.error('no word data found', error); }
      return response;
    } )
    .then( (results) => {
      const resultsData = results;
      for ( const result of resultsData ) {
        
        const resultDemo = result.demographic;
        wordModelObj[resultDemo] = result.words;
      }

      // for ( const element of Object.keys(wordModelObj) ) {
      //   const el = wordModelObj[element];
      //   console.log(el, 'element');
      // }

      // return res.send( resultObj );
    } );
    await models.FinalResult.find( {}, ( error: any, response: any ) => {
      if (error) { console.log( error ); }

      return response;
     } )
     .then( (results) => {
      console.log('inside final results then');

      dataModelObj.data = results;
      console.log(dataModelObj, 'dataModelObj');
     } );
    console.log(wordModelObj);
    combinedObj.wordModel = wordModelObj;
    combinedObj.dataModel = dataModelObj;
    console.log(combinedObj, 'combinedObj');
    return res.send(combinedObj);
  },
};

export default controller;

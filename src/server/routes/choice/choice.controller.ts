import { Request, Response } from 'express';

import models from '../../models/index';

interface IPostObject {
  demographicMatch?: boolean;
  submissionLength?: number;
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
  postName: ( req: Request, res: Response ) => {

    const body = req.body;

    const dataObject: IPostObject = {};
    const chosenDemographic = body.demographic;

    models.Data.findOne({_id: body._id}, (error, response) => {
      if (error) {
        console.error('Cannot find corresponding ID', error);
      }
      console.log(response);
      if ( response ) {
        const actualDemographic = response.demographic;
        const original = response.originalString;
        const length = original.length;
        if ( actualDemographic === chosenDemographic ) {
          dataObject.demographicMatch = true;
        } else {
          dataObject.demographicMatch = false;
        }
        dataObject.submissionLength = length;
        dataObject.correspondingID = body._id;
      }
    });
    console.log(dataObject);
    // loop over the original and then add those

    return res.sendStatus(200);
  },
};

export default controller;

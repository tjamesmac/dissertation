import { Request, Response } from 'express';

import models from '../../models/index';

const controller = {
  getAdmin: async ( req: Request, res: Response ) => {
    console.log('getAdmin over');
    const data = await models.Data.find({}, (error, response) => {
      if (error) {
        console.error('finding documents', error);
      }
      // console.log(response);
    });
    const finalResults = await models.FinalResult.find({}, (error, response) => {
      if (error) {
        console.error('finding documents', error);
      }
      console.log(response);
    });
    const wordResults = await models.Words.find({}, (error, response) => {
      if (error) {
        console.error('finding documents', error);
      }
    });
    const dataResponse = data;
    const finalResultsData = finalResults;
    const wordResultsData = wordResults;
    console.log(dataResponse);
    const resObject = { data: dataResponse, final: finalResultsData, words: wordResultsData };
    res.send(resObject);
  },
};

export default controller;

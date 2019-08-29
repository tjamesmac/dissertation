import { Request, Response } from 'express';

import models from '../../models/index';

const controller = {
  getNew: async ( req: Request, res: Response ) => {
    // in here I need to return the last submission and then add the result to it
    // first lets render the two different options;
    // next step is to then check if there are two from each demographic;
    const length = await models.Data.countDocuments();

    if (length > 3) {
      const data = models.Data.find( (error, response) => {
        if (error) {
          console.error('finding documents', error);
        }
        console.log(response);
        return res.send(response);

      }).sort({ _id: -1 }).limit(3);
    }
  },
  postName: ( req: Request, res: Response ) => {

    const body = req.body;
    console.log(body);

    return res.sendStatus(200);
  },
};

export default controller;

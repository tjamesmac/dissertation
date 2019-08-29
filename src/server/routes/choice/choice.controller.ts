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
    const value = body.value;
    const demographic = body.demographic;
    const _id = body._id;
    const data = { value, demographic, _id };

    models.Data.findOne({_id: body._id}, (error, response) => {
      if (error) {
        console.error('Cannot find corresponding ID', error);
      }
      console.log(response);
    });

    return res.send(data);
  },
};

export default controller;

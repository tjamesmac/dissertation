import { Request, Response } from 'express';

import models from '../../models/index';

const dataController = ( req: Request, res: Response ) => {

  const body = req.body;
  const data = new models.Data();
  data.originalString = body.originalString;
  data.newString = body.newString;
  data.orderOfWords = body.orderOfWords;
  data.demographic = body.demographic;

  data.save( (error: string) => {
    if (error) { console.log(error); }
    console.log('data saved');
  } );

  return res.sendStatus(200);
};

export default dataController;

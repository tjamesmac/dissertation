import { Request, Response } from 'express';
import { genderCheck } from '../../../public/typescript/main/main.helpers';
import models from '../../models/index';

const dataController = ( req: Request, res: Response ) => {

  const body = req.body;
  console.log(body);
  const data = new models.Data();
  data.originalString = body.originalString;
  data.newString = body.newString;
  data.orderOfWords = body.orderOfWords;
  data.initialGenderedWords = body.initialGenderedWords;
  data.finalGenderedWords = genderCheck(body.orderOfWords);
  data.demographic = body.demographic;
  data.length = body.length;
  data.save( (error: string) => {
    if (error) { console.log(error); }
    console.log('data saved');
    console.log(data, 'this is my data object that i am saving');
  } );

  return res.sendStatus(200);
};

export default dataController;

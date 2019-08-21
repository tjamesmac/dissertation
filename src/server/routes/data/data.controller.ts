import { Request, Response } from 'express';
import models from '../../models';
import User from '../../models/user/user';

const dataController = ( req: Request, res: Response ) => {

  const body = req.body;
  const user = new User();
  user.username = body.username;
  // user.save( (error: string) => {
  //   if (error) {
  //     console.error(error);
  //   }
  //   console.log('hello i have saved');
  // });

  return res.sendStatus(200);
};

export default dataController;

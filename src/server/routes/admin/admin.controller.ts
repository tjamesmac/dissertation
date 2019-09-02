import { Request, Response } from 'express';

import models from '../../models/index';


const controller = {
  getData: ( req: Request, res: Response ) => {
    console.log('i am in the new controller');

    return res.sendStatus(200);
  },
};

export default controller;

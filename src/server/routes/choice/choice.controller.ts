import { Request, Response } from 'express';

const controller = {
  getNew: ( req: Request, res: Response ) => {
    return res.send('hello');
  },
};

export default controller;

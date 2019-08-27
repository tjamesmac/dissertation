import { Request, Response } from 'express';

const controller = {
  getNew: ( req: Request, res: Response ) => {
    return res.send('hello');
  },
  postName: ( req: Request, res: Response ) => {
    return res.send('poop');
  },
};

export default controller;

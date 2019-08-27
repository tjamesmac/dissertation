import { Request, Response } from 'express';

const controller = {
  getNew: ( req: Request, res: Response ) => {
    console.log('hello why are you not working');
    const object = { value: 'hello' };
    const json = JSON.stringify(object);
    console.log(json);
    return res.send(object);
  },
  postName: ( req: Request, res: Response ) => {
    return res.send('poop');
  },
};

export default controller;

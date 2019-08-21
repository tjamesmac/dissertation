import { Request, Response } from 'express';
import { getWordData, isString  } from '../../helpers/wordProcessing';

// class homeController {
//   path = '/';

//   public postWords = ( req: Request, res: Response ) => {
//     console.log('inside everything');
//     const words = req.body;
//     console.log(words);
//     console.log(words.value);

//     const split = isString(words.value);
//     const getWords = getWordData(split);

//     res.send(getWords);
//   }
//   public getSomething = ( req: Request, res: Response ) => {
//     console.log('i worked');
//   }
// }



export const postHomeController = ( req: Request, res: Response ) => {

  console.log('inside everything');
  const words = req.body;
  console.log(words);
  console.log(words.value);

  const split = isString(words.value);
  const getWords = getWordData(split);

  return res.send(getWords);
};

export default postHomeController;

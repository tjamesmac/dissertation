import { Request, Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../../../public/Typescript/App/App';
import { getWordData, isString  } from '../../helpers/wordProcessing';
import { htmlTemplate } from '../../htmlTemplate';
import { overAll } from '../../wordnet';

const controller = {
  postHomeController: async ( req: Request, res: Response ) => {
    // console.log('inside everything');
    const words = req.body;
    // this needs to be lowercased before going through the function

    overAll( words.value )
      .then( ( answer ) => {
        for ( const prop of Object.keys(answer) ) {
          if (!answer[prop].length) {
            delete answer[prop];
          }
        }
        return res.send( answer );
      } );

    // console.log( wait );
    // wait.then((response) => console.log(response, 'response'));
    // console.log(wait, 'controller');

    // console.log(words.value);

    // const split = isString(words.value);
    // const getWords = getWordData(split);
    

    // return res.send('getWords');
  },
  getSSR: ( req: Request, res: Response ) => {
    const jsx = ( <App /> );
    const reactDom = renderToString( jsx );

    res.writeHead( 200, { 'Content-Type': 'text/html' } );
    res.end( htmlTemplate( reactDom ) );
  },
};

export default controller;

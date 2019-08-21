import { Request, Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../../../public/Typescript/App/App';
import { getWordData, isString  } from '../../helpers/wordProcessing';
import { htmlTemplate } from '../../htmlTemplate';

const controller = {
  postHomeController: ( req: Request, res: Response ) => {
    console.log('inside everything');
    const words = req.body;

    console.log(words.value);

    const split = isString(words.value);
    const getWords = getWordData(split);

    return res.send(getWords);
  },
  getSSR: ( req: Request, res: Response ) => {
    const jsx = ( <App /> );
    const reactDom = renderToString( jsx );

    res.writeHead( 200, { 'Content-Type': 'text/html' } );
    res.end( htmlTemplate( reactDom ) );
  },
};

export default controller;

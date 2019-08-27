import { Request, Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../../../public/typescript/app/app';
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
  },
  getSSR: ( req: Request, res: Response ) => {
    const context = { };
    const jsx = (
          <StaticRouter context={ context } location={ req.url }>
            <App />
          </StaticRouter>
    );
    const reactDom = renderToString( jsx );

    res.writeHead( 200, { 'Content-Type': 'text/html' } );
    res.end( htmlTemplate( reactDom ) );
  },
};

export default controller;

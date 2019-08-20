import * as React from 'react';
import { IResponse, validateWords } from '../Main/helpers';

export interface ITextArea {
  children?: JSX.Element[] | JSX.Element;
  response: IResponse[] | null;
}

/**
 * 
 * I am going to add the response and function into this so I don't need a helper
 * function
 */
export const TextArea = ( prop: ITextArea ): JSX.Element => {

  return (
    <div id='textarea' contentEditable>
      { prop.children }
    </div>
  );
};

export default TextArea;

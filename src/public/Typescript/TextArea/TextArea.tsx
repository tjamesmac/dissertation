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
  const response = prop.response;
  if (response) {
    const textAreaValue: string =
      (document.getElementById('textarea') as HTMLDivElement)
      .innerText;
    const textChange = validateWords(response, textAreaValue);
    (document.getElementById('textarea') as HTMLDivElement).innerHTML = textChange;

  }

  return (
    <div id='textarea' contentEditable>
      { prop.children }
    </div>
  );
};

export default TextArea;

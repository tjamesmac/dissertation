import * as React from 'react';

export interface ITextArea {
  children?: JSX.Element[] | JSX.Element;
}

/**
 * 
 * I am going to add the response and function into this so I don't need a helper
 * function
 */
export const TextArea = ( prop: ITextArea ): JSX.Element => {
  const response = prop.response;
  if (response) {
    console.log(response);
  }

  return (
    <div id='textarea' contentEditable>
      { prop.children }
    </div>
  );
};

export default TextArea;

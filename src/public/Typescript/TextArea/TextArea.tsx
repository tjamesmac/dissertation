import * as React from 'react';

export interface ITextArea {
  children?: JSX.Element[] | JSX.Element;
}

export const TextArea = ( prop: ITextArea ): JSX.Element => {

  return (
    <div id='textarea' contentEditable>
      { prop.children }
    </div>
  );
};

export default TextArea;

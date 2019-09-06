import * as React from 'react';
import { ITextArea } from './textArea.interface';

export const TextArea = ( prop: ITextArea ): JSX.Element => {
  return (
    <div id='textarea' contentEditable placeholder='Please enter an advert here...'>
      { prop.children }
    </div>
  );
};

export default TextArea;

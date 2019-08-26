import * as React from 'react';
import { ITextArea } from './extArea.interface';

export const TextArea = ( prop: ITextArea ): JSX.Element => {
  return (
    <div id='textarea' contentEditable>
      { prop.children }
    </div>
  );
};

export default TextArea;

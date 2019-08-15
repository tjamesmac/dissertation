import * as React from 'react';

interface IModalProps { words: string[]; }

const Modal = (prop: IModalProps): JSX.Element => {

  const words: string[] = prop.words;
  const wordMap = words.map((word: string, index: number) => {
    return <li key={index}>{word}</li>;
  });
  return (
    <ul className='synonym'>
      {wordMap}
    </ul>
  );

};

export default Modal;

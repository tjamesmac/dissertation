import * as React from 'react';

export interface IModalPosition {
  top: number;
  left: number;
}
interface IModalProps {
  words: string[];
  position: IModalPosition;
}

const Modal = (prop: IModalProps): JSX.Element => {

  const words: string[] = prop.words;
  const position = prop.position;
  const positionCSS = {
    top: prop.position.top,
    left: prop.position.left,
  };
  const wordMap = words.map((word: string, index: number) => {
    return <li key={index}>{word}</li>;
  });
  return (
    <ul className='synonym' style={positionCSS}>
      {wordMap}
    </ul>
  );

};

export default Modal;

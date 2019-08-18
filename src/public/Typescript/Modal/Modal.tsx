import * as React from 'react';

export interface IModalPosition {
  top: number;
  left: number;
}
interface IModalProps {
  words: string[];
  position: IModalPosition;
  onWordClick: (event: any) => void;
}

const Modal = (prop: IModalProps): JSX.Element => {

  const words: string[] = prop.words;
  const position = prop.position;
  const positionCSS = {
    top: position.top,
    left: position.left,
  };
  const wordMap = words.map((word: string, index: number) => {
    return <li
              className='synonyms-item'
              onClick={(e) => prop.onWordClick(e)}
              key={index}>{word}
            </li>;
  });
  return (
    <ul className='synonyms' style={positionCSS}>
      {wordMap}
    </ul>
  );

};

export default Modal;

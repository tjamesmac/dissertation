import * as React from 'react';
import { IWordAndSynonym } from '../main/main.interface';

export interface IModalPosition {
  top: number;
  left: number;
}
interface IModalProps {
  words: IWordAndSynonym;
  position: IModalPosition;
  onWordClick: ( event: any ) => void;
  hover: ( event: any ) => void;
  removeHover: ( event: any ) => void;

}

const Modal = ( prop: IModalProps ): JSX.Element => {

  const words = prop.words;
  const hover = prop.hover;
  const removeHover = prop.removeHover;
  const synonyms = words.synonyms;
  const position = prop.position;
  const positionCSS = {
    top: position.top,
    left: position.left,
  };
  const wordMap = synonyms.map(( word: string, index: number ) => {
    return <li
              className='synonyms-item'
              onClick={(e) => prop.onWordClick(e)}
              key={index}>{word}
            </li>;
  });
  return (
    <ul className='synonyms' style={positionCSS} onMouseEnter={hover} onMouseLeave={removeHover}>
      {wordMap}
    </ul>
  );

};

export default Modal;

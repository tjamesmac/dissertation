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
  hover: ( event: any ) => any;
  removeHover: ( event: any ) => any;

}

const Modal = ( prop: IModalProps ): JSX.Element => {
  const words: any = prop.words;
  const wordKeys = Object.keys(words);
  let adverbs;
  let adjectives;
  let verbs;
  let nouns;
  for ( const type of wordKeys ) {
    if (type !== 'word') {

      if (type === 'adjectives') {
        adjectives = words[type];
      }
      if (type === 'adverbs') {
        adverbs = words[type];
      }
      if (type === 'nouns') {
        nouns = words[type];
      }
      if (type === 'verbs') {
        verbs = words[type];
      }
    }
  }
  const hover = prop.hover;
  const removeHover = prop.removeHover;
  const position = prop.position;
  const positionCSS = {
    top: position.top,
    left: position.left,
  };
  let wordMapAdj;
  let adjType;
  if (adjectives) {
    adjType = <li className='synonyms-type'>Adjectives</li>;
    const actualAdj = adjectives;
    wordMapAdj = actualAdj.map(( word: string, index: number ) => {
      return <li
                className='synonyms-item'
                onClick={ (e) => prop.onWordClick(e) }
                key={index}
              >
                {word}
              </li>;
    });
  }
  let wordMapAdverb;
  let adverbType;
  if (adverbs) {
    console.log(adverbs, 'this is adverbs');
    console.log(adverbs.length);
    adverbType = <li className='synonyms-type'>Adverbs</li>;
    const actualAdverbs = adverbs;
    console.log(actualAdverbs, 'this just caused an error');
    wordMapAdverb = actualAdverbs.map(( word: string, index: number ) => {
    return <li
              className='synonyms-item'
              onClick={ (e) => prop.onWordClick(e) }
              key={index}
            >
              {word}
            </li>;
  });
  }
  let wordMapNouns;
  let nounType;
  if (nouns) {
    nounType = <li className='synonyms-type'>Nouns</li>;
    const actualNouns = nouns;
    wordMapNouns = actualNouns.map(( word: string, index: number ) => {
      return <li
                className='synonyms-item'
                onClick={ (e) => prop.onWordClick(e) }
                key={index}
              >
                {word}
              </li>;
    });
  }
  let wordMapVerbs;
  let verbType;
  if (verbs) {
    verbType = <li className='synonyms-type'>Verbs</li>;
    const actualVerbs = verbs;
    wordMapVerbs = actualVerbs.map(( word: string, index: number ) => {
      return <li
                className='synonyms-item'
                onClick={ (e) => prop.onWordClick(e) }
                key={index}
              >
                {word}
              </li>;
    });
  }

  return (
    <ul
      className='synonyms'
      style={ positionCSS }
      onMouseEnter={ hover }
      onMouseLeave={ removeHover }
      >
        {adjType}
        {wordMapAdj}
        {adverbType}
        {wordMapAdverb}
        {nounType}
        {wordMapNouns}
        {verbType}
        {wordMapVerbs}
    </ul>
  );

};

export default Modal;

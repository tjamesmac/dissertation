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
  console.log(words, 'words');
  const wordKeys = Object.keys(words);
  console.log(wordKeys);
  const adverbs = [];
  const adjectives = [];
  const verbs = [];
  const nouns = [];
  for ( const type of wordKeys ) {
    if (type !== 'word') {
      console.log(type);
      console.log(words[type]);
      if (type === 'adjectives') {
        adjectives.push(words[type]);
      }
      if (type === 'adverbs') {
        adverbs.push(words[type]);
      }
      if (type === 'nouns') {
        nouns.push(words[type]);
      }
      if (type === 'verbs') {
        verbs.push(words[type]);
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
  if (adjectives.length) {
    adjType = <li className='synonyms-type'>Adjectives</li>;
    const actualAdj = adjectives[0];
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
  if (adverbs.length) {
    adverbType = <li className='synonyms-type'>Adverbs</li>;
    const actualAdverbs = adverbs[0];
    
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
  if (nouns.length) {
    nounType = <li className='synonyms-type'>Nouns</li>;
    const actualNouns = nouns[0];
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
  if (verbs.length) {
    verbType = <li className='synonyms-type'>Verbs</li>;
    const actualVerbs = verbs[0];
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
    <ul className='synonyms' style={positionCSS} onMouseEnter={hover} onMouseLeave={removeHover}>
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

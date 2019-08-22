import * as React from 'react';
import { IDataPL } from './Main.interface';

export interface IResponse {
  word: string;
  type: string;
  synonyms: string[];
}

// State reducer
export const dataReducer = ( state: IDataPL, action: any ) => {
  switch ( action.type ) {
    case 'UPDATE_ORIGINAL':
      return {
        ...state,
        originalString: action.payload,
      };
    case 'UPDATE_NEW':
      return {
        ...state,
        newString: action.payload,
      };
    case 'UPDATE_ORDER':
      const value = action.payload;

      // const mergeStates = state.orderOfWords.concat(value);
      const alternativeState = [...state.orderOfWords, value];

      return {
        ...state,
        orderOfWords: alternativeState,
      };
    case 'UPDATE_DEMO':
      return {
        ...state,
        demographic: action.payload,
      };
      default:
        throw new Error();
  }
};

export const validateWords = ( response: IResponse[], textCheck: string ): string => {

  let toChange: string = textCheck;
  for (let key of response) {
    if (textCheck.includes(key.word)) {
      const word = key.word;
      const regex = new RegExp(word, 'g');
      // string doesn't replace unless assigned to variable
      const newString = toChange.replace(regex, `<span style='color: green'>${word}</span>`);
      // assign changes to the original string
      toChange = newString;
    } else {
      console.log('oh bother');
    }
  }
  return toChange + '&#8203;';
};

export const createSpan = ( elementTag: string, text: string, colour: string ) => {
  const span = document.createElement(elementTag);
  const textNode = document.createTextNode(text);
  span.appendChild(textNode);
  span.style.color = colour;
  return span;
};

import * as React from 'react';
import { IDataPL, IResponse } from './main.interface';

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
    case 'UPDATE_LENGTH':
      return {
        ...state,
        length: action.payload,
      };
      default:
        throw new Error();
  }
};
// removed IResponse from response
export const validateWords = ( response: any, textCheck: string ): string => {
  const keys = Object.keys(response);
  const newKeys = keys.filter( (x) => {
    if (response[x].length) {
      return x;
    } else {
      return null;
    }
  } );
  let toChange: string = textCheck;
  for (const key of newKeys) {
    if (textCheck.includes(key)) {
      const word = key;
      // const regex = new RegExp(word, 'g');
      const regex = new RegExp('\\b' + key + '\\b', 'g');
      // string doesn't replace unless assigned to variable
      // styling has been taking up because the replace wasn't capable of handling it
      const newString = toChange.replace(regex, `<span>${word}</span>`);

      toChange = newString;
    } else {
      console.log('oh bother');
    }
  }
  return toChange + '&#8203;';
};

export const greenify = async () => {
  const textarea = (document.getElementById('textarea') as HTMLDivElement);
  const children: any = await textarea.children;
  console.log(children);
  if (children) {
    console.log('hello');
    for ( const element of children ) {
      element.style.color = 'green';
    }
  } else {
    console.error('no adjectives are present');
  }
};

export const createSpan = ( elementTag: string, text: string, colour: string ) => {
  const element = document.createElement(elementTag);
  const textNode = document.createTextNode(text);
  element.appendChild(textNode);
  element.style.color = colour;
  return element;
};

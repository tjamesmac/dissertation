
import { IDataPL, IGenderedWords } from './main.interface';

const genderedWords = {
  maleGenderedWords:
    [
      'active',
      'adventurous',
      'aggress',
      'ambitio',
      'analy',
      'assert',
      'athlet',
      'autonom',
      'boast',
      'challeng',
      'compet',
      'confident',
      'courag',
      'decide',
      'decisive',
      'decision',
      'determin',
      'dominant',
      'domina',
      'force',
      'greedy',
      'headstrong',
      'hierarch',
      'hostil',
      'impulsive',
      'independent',
      'individual',
      'intellect',
      'lead',
      'logic',
      'masculine',
      'objective',
      'opinion',
      'outspoken',
      'persist',
      'principle',
      'reckless',
      'stubborn',
      'superior',
      'self-confiden',
      'self-sufficien',
      'self-relian',
    ]
  ,
  femaleGenderedWords:
    [
      'affectionate',
      'child',
      'cheer',
      'commit',
      'communal',
      'compassion',
      'connect',
      'considerate',
      'cooperat',
      'depend',
      'emotiona',
      'empath',
      'feminine',
      'flatterable',
      'gentle',
      'honest',
      'interpersonal',
      'interdependen',
      'interpersona',
      'kind',
      'kinship',
      'loyal',
      'modesty',
      'nag',
      'nutur',
      'pleasant',
      'polite',
      'quiet',
      'respon',
      'sensitiv',
      'submissive',
      'support',
      'sympath',
      'tender',
      'together',
      'trust',
      'understand',
      'warm',
      'whin',
      'yield',
    ],
};

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
    case 'UPDATE_INITIALGENDER':
      return {
        ...state,
        initialGenderWords: action.payload,
      };
    case 'UPDATE_FINALGENDER':
      return {
        ...state,
        finalGenderWords: action.payload,
      };
      default:
        throw new Error();
  }
};

const wordMatcher = (key: string, stringToChange: string) => {

  const word = key;
  const regex = new RegExp('\\b' + key + '\\b', 'g');
  const newString = stringToChange.replace(regex, `<span class=''>${word}</span>`);
  return newString;
};

export const validateWords = ( response: any, textCheck: string ): any => {
  const keys = Object.keys(response);

  const availableWords = [];
  const restOfWords = [];
  for ( const pos of keys ) {

    const wordKeys = Object.keys(response[pos]);
    if (pos !== 'rest' ) {
      availableWords.push(wordKeys);
    } else {
      restOfWords.push(wordKeys);
    }
  }

  const flattened = availableWords
    .reduce( (accumulator, currentValue) => {
      return accumulator.concat(currentValue);
  });
  const validWords: string[] = [];
  let toChange: string = textCheck;

  for (const word of flattened) {

    if ( !validWords.includes( word ) && word !== '' ) {
      validWords.push(word);
      const newWord = wordMatcher(word, toChange);
      toChange = newWord;
    }
  }

  const genderedWordObject = genderCheck(validWords);

  if (validWords.length) {
    toChange += '&#8203;';
  }
  const validObject = {
    updatedString: toChange,
    valid: validWords,
    initialGendered: genderedWordObject,
  };

  return validObject;
};

export const greenify = async () => {
  const textarea = (document.getElementById('textarea') as HTMLDivElement);
  const children: any = textarea.children;

  if (children) {
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

export const genderCheck = ( wordsToCheck: string[] ) => {
  const masculineWords = [];
  const feminineWords = [];
  for ( const word of wordsToCheck ) {

    for ( const male of genderedWords.maleGenderedWords ) {
      if ( word.match(male) ) {
        masculineWords.push(word);
      }
    }
    for ( const female of genderedWords.femaleGenderedWords ) {
      if ( word.match(female) ) {
        feminineWords.push(word);
      }
    }
  }
  console.log(masculineWords, feminineWords, 'gendered arrays');
  const genderWords: IGenderedWords = {
    male: masculineWords,
    female: feminineWords,
  };
  return genderWords;
};

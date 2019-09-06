
import { IDataPL } from './main.interface';

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
      default:
        throw new Error();
  }
};
// removed IResponse from response
// export const validateWords = ( response: any, textCheck: string ): string => {
//   const keys = Object.keys(response);
//   const newKeys = keys.filter( (x) => {
//     if (response[x].length) {
//       return x;
//     } else {
//       return null;
//     }
//   } );
//   let toChange: string = textCheck;
//   for (const key of newKeys) {
//     if (textCheck.includes(key)) {
//       const word = key;
//       // const regex = new RegExp(word, 'g');
//       const regex = new RegExp('\\b' + key + '\\b', 'g');
//       // string doesn't replace unless assigned to variable
//       // styling has been taking up because the replace wasn't capable of handling it
//       const newString = toChange.replace(regex, `<span>${word}</span>`);

//       toChange = newString;
//     } else {
//       console.log('oh bother');
//     }
//   }
//   return toChange + '&#8203;';
// };
const wordMatcher = (key: string, stringToChange: string, gender: string) => {
  
  const word = key;
  const regex = new RegExp('\\b' + key + '\\b', 'g');
  const newString = stringToChange.replace(regex, `<span class='${gender}'>${word}</span>`);

  return newString;
};

export const validateWords = ( response: any, textCheck: string ): any => {
  const maleWords = [];
  const femaleWords = [];
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
      for (const male of genderedWords.maleGenderedWords) {
        // console.log(key, word);
        // console.log(word.search(key));
        if (textCheck.includes(key) && key.match(male)) {

          const maleNew  = wordMatcher(key, toChange, 'male');
          maleWords.push(key);
          toChange = maleNew;
        }
      }
      for (const female of genderedWords.femaleGenderedWords) {
        if (textCheck.includes(key) && key.match(female)) {
          femaleWords.push(key);
          const femaleWord = wordMatcher(key, toChange, 'female');
          toChange = femaleWord;
        }
      }
  }
  toChange += '&#8203;';
  const returnedObject = { male: maleWords, female: femaleWords, textChange: toChange };
  return returnedObject;
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

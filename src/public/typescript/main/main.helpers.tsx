
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
const wordMatcher = (key: string, stringToChange: string) => {

  const word = key;
  const regex = new RegExp('\\b' + key + '\\b', 'g');
  const newString = stringToChange.replace(regex, `<span class=''>${word}</span>`);
  return newString;
};

// export const validateWords = ( response: any, textCheck: string ): any => {
//   const maleWords = [];
//   const femaleWords = [];
//   const keys = Object.keys(response);
//   console.log(keys);
//   const newKeys = keys.filter( (x) => {
//     if (response[x].length) {
//       return x;
//     } else {
//       return null;
//     }
//   } );
//   console.log(newKeys, 'new keys');
//   let toChange: string = textCheck;
//   for (const key of newKeys) {
//       for (const male of genderedWords.maleGenderedWords) {
//         // console.log(key, word);
//         // console.log(word.search(key));
//         if (textCheck.includes(key) && key.match(male)) {

//           const maleNew  = wordMatcher(key, toChange, 'male');
//           maleWords.push(key);
//           toChange = maleNew;
//         }
//       }
//       for (const female of genderedWords.femaleGenderedWords) {
//         if (textCheck.includes(key) && key.match(female)) {
//           femaleWords.push(key);
//           const femaleWord = wordMatcher(key, toChange, 'female');
//           toChange = femaleWord;
//         }
//       }
//   }
//   toChange += '&#8203;';
//   const returnedObject = { male: maleWords, female: femaleWords, textChange: toChange };
//   return returnedObject;
// };

export const validateWords = ( response: any, textCheck: string ): any => {
  console.log(textCheck, 'this is my text check');
  const totalWords: any = [];
  console.log(response, 'response inside valid')
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
  
  console.log(flattened, 'this is my flattened array');
  for (const word of flattened) {

    if ( !validWords.includes( word ) && word !== '' ) {
      console.log(word, 'this is for the valid words');
      validWords.push(word);
      const newWord = wordMatcher(word, toChange);
      toChange = newWord;
    }
  }

  // THIS IS PART OF THE OBJECT I WANT TO SEND
  console.log(validWords);

  const genderedWordObject = genderCheck(validWords);

  // for ( const key of keys ) {
  //   if (Object.entries(response[key]).length !== 0 ) {
  //     // console.log(response[key], 'key', key);
  //     const innerKeys = Object.keys(response[key]);
  //     for (const innerKey of innerKeys) {
  //       if (!totalWords.includes(innerKey)) {
  //         totalWords.push(innerKey);
  //       }
  //     }
  //     // console.log(innerKeys, 'these are the inner keys I want');
  //     for ( const word of innerKeys) {
  //       const wordObject = response[key];
  //       if (wordObject[word].length) {
  //         // console.log(wordObject[word], 'inside the word synonym array');
  //       }
  //     }
  //   }
  // }
  // console.log(totalWords);

  // THIS IS NOT COMPLETED YET. NEED TO VERIFY THE WORDS ARE GENDERED
  // WORDS THAT ARE GENDERED WILL BE ADDED TO AN ARRAY AND ADDED TO THIS OBJECT
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
    console.log(word, 'valid word loop');

    for ( const male of genderedWords.maleGenderedWords ) {
      if ( male === word ) {
        masculineWords.push(word);
      }
    }
    for ( const female of genderedWords.femaleGenderedWords ) {
      if ( female === word ) {
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

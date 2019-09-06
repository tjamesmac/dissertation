console.log('hello');
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
    ]
};
const string = 'responsible';
console.log(genderedWords.femaleGenderedWords.includes(string));

const wordMatcher = (key, stringToChange) => {
  console.log(key, stringToChange, gender);
  const word = key;
  // const regex = new RegExp(word, 'g');
  const regex = new RegExp('\\b' + key + '\\b', 'g');
  // string doesn't replace unless assigned to variable
  // styling has been taking up because the replace wasn't capable of handling it
  const newString = toChange.replace(regex, `<span class='${gender}'>${word}</span>`);

  toChange = newString;
};

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
      for (const word of genderedWords.maleGenderedWords) {
        wordMatcher(key, toChange, 'male');
      }
      for (const word of genderedWords.femaleGenderedWords) {
        wordMatcher(key, toChange, 'female');
      }
    }
  }
  return toChange + '&#8203;';
};


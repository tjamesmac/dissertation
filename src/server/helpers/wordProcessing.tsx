export interface IWord {
  word: string;
  type: string;
  synonyms: string[];
}

export const isString = (words: string): string[] => {
  const splitString: string[] = words.split(' ');
  return splitString;
};

export const removeDoubles = (splitWords: string[]): string[] => {
  const newArr: string[] = [];
  for ( let i = 0; i < splitWords.length; i++ ) {
    if (!newArr.includes(splitWords[i])) {
      const word: string = splitWords[i].toLowerCase();
      newArr.push(word);
    }
  }
  return newArr;
};

export const getWordData = (splitWords: string[]) => {
  const arrayOfAdjectivesMetadata: object[] = [];
  const arrayOfAdjectives: string[] = [];
  const arrayOfOther: string[] = [];
  const fakeWordObjectPositive: any = [
    {
      word: 'hello',
      type: 'adjective',
      synonyms: ['hi', 'hiya'],
    },
    {
      word: 'world',
      type: 'noun',
      synonyms: ['globe', 'the earth'],
    },
    {
      word: 'test',
      type: 'adjective',
      synonyms: ['exam'],
    },
  ];
  for (let word of splitWords) {
    if (!arrayOfAdjectives.includes(word) && !arrayOfOther.includes(word)) {
      // search for the word here
      for (let key of fakeWordObjectPositive) {
        const fakeWord = key.word;
        const fakeType = key.type;
        if (fakeWord === word) {
          if (fakeType === 'adjective') {
            arrayOfAdjectivesMetadata.push(key);
            arrayOfAdjectives.push(key.word);
          } else {
            arrayOfOther.push(fakeWord);
          }
        }
      }
    } else {
      console.log('i am already in the array');
    }
  }
  return arrayOfAdjectivesMetadata;
};
// do I need to record the position of the words so I can then highlight them after wards?
// would be good if I could make a solid loop in order to account for the words
//

// I want to save the submitted text
// I want to save the edited text

// want it to work both ways
//    that is, if you write the words with in the area
//    or submit it via the button

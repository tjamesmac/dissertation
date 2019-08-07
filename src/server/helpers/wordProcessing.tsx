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

  const fakeWordObject: IWord = {
    word: 'hello',
    type: 'adjective',
    synonyms: ['hi', 'hiya'],
  };
  const word: string = splitWords[0];
  if (!arrayOfAdjectives.includes(word)) {
    arrayOfAdjectivesMetadata.push(fakeWordObject);
    return arrayOfAdjectivesMetadata;
  } else {
    return null;
  }

  // for (let i = 0; i < splitWords.length; i++) {
  //   const word: string = splitWords[i];
  //   if (arrayOfAdjectives.includes(word)) {
  //     // if the adjective is there use the data

  //     arrayOfAdjectivesMetadata.map((item: any) => {
  //       if (item.word === word) {
  //         return item;
  //       }
  //     });
  //     // for (let key in arrayOfAdjectivesMetadata) {
  //     //   if (key.word === word) {
  //     //     return key;
  //     //   }
  //     // }
  //     // here I could potentially just populate the state with the adjective insteadx
  //   } else {
  //     if (!arrayOfAdjectives.includes(word) || !arrayOfOther.includes(word)) {
  //       // inside here I want to send off the request to wordnet
  //       const fakeWordObject: IWord = {
  //         word: 'hello',
  //         type: 'adjective',
  //         synonyms: ['hi', 'hiya'],
  //       };
  //       if (fakeWordObject.type === 'adjective') {
  //         // this needs to push an object into the array
  //         // it will need to include the word, position in the string, list of synonyms
  //         arrayOfAdjectivesMetadata.push(fakeWordObject);
  //         return fakeWordObject;
  //       } else {
  //         arrayOfOther.push(word);
  //       }
  //     }
  //   }
  // }
};
// do I need to record the position of the words so I can then highlight them after wards?
// would be good if I could make a solid loop in order to account for the words
//

// I want to save the submitted text
// I want to save the edited text

// want it to work both ways
//    that is, if you write the words with in the area
//    or submit it via the button

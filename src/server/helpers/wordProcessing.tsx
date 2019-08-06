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

export const words = (splitWords: string[]) => {
  const arrayOfAdjectives = [];
  const arrayOfOther = [];

  for (let i = 0; i < splitWords.length; i++) {
    const word = splitWords[i];
    if (arrayOfAdjectives.includes(word)) {
      // if the adjective is there use the data
    } else {
      if (!arrayOfAdjectives.includes(word) || !arrayOfOther.includes(word)) {
        // inside here I want to send off the request to wordnet
        if (word === 'adjective') {
          // this needs to push an object into the array
          // it will need to include the word, position in the string, list of synonyms
          arrayOfAdjectives.push({ position: 1, word: 'Hello', synonyms: ['hi', 'hiya']});
        } else {
          arrayOfOther.push(word);
        }
      }
    }
  }
};
// do I need to record the position of the words so I can then highlight them after wards?
// would be good if I could make a solid loop in order to account for the words
//

// I want to save the submitted text
// I want to save the edited text

// want it to work both ways
//    that is, if you write the words with in the area
//    or submit it via the button

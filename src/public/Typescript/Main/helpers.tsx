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

export
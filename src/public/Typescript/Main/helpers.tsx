import * as React from 'react';

export interface IResponse {
  word: string;
  type: string;
  synonyms: string[];
}

export const validateWords = ( response: IResponse[] ): string => {

  const textAreaValue: string =
    (document.getElementById('textarea') as HTMLDivElement)
    .innerText;
  let toChange = textAreaValue;
  for (let key of response) {
    if (textAreaValue.includes(key.word)) {

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

// export const highlightWords = ( response: IResponse[] ) => {

//   const textareaValue = (document.getElementById('textarea') as HTMLDivElement);
//   const textareaString = textareaValue.innerText;
//   const splitText = textareaString.split(' ');
  

//   while (textareaValue.firstChild) { textareaValue.removeChild(textareaValue.firstChild); }
//   for (let key of response) {
//     if (textareaValue.innerText.includes(key.word)) {
//       // turns green
//       const span = createSpan('span', key.word);
//       span.style.color = 'green';
//       textareaValue.appendChild(span);
//     } else {
//       const textNode = document.createTextNode()
//     }
//   }
//   for (let element of splitInitial) {
//     if (synonyms) {
//       if (element === synonyms.word) {
//         const span = document.createElement('span');
//         span.style.color = 'blue';
//         const text = document.createTextNode(value);
//         span.appendChild(text);
//         initial.appendChild(span);
//       } else {
//         const textNode = document.createTextNode(element);
//         initial.appendChild(textNode);
//       }
//     }
//   }
// }

// const createSpan = ( element: string, text: string ) => {

//   const span = document.createElement(element);
//   const textNode = document.createTextNode(text);
//   span.appendChild(textNode);
//   return span;

// };

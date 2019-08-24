import WordPos from 'wordpos';

const wordpos = new WordPos();

// const string = 'this is my angry bear, quiet bear and small bear string';

// const wordLookUp = async (result: string) => {
//   console.log(result + 'po');
//   return await result + 'po';
// };

// export const adjectiveLookup = async (string: string) => {
//   async function somethingTest() {
//     const adjUp = wordpos.getAdjectives( string, async (results: string[]) => {
//       console.log(results, 'adjective lookup results');
//       return await results.forEach( wordLookUp );
//     } );
//     console.log( await adjUp, 'adjup');
//     return await adjUp;
//   }
//   const test = await somethingTest();
//   console.log(test, 'test');
//   // const waitingAjd = await somethingTest();
//   // console.log(waitingAjd, 'before return');
//   // return waitingAjd;
// };
// const adjLU = adjectiveLookup('I am a big quiet poop');
// console.log(adjLU);

export const adjectiveLookup = async ( words: string ) => {
  const biggerArray: any = [];
  const returnedWords = words;

  const getAdjCB = (results: string[]) => {
    return results;
  };

  async function isAdjective( stringWords: string ) {
    const get = wordpos.getAdjectives( stringWords, getAdjCB);
    return get;
  }

  const getAdjResults = async ( result: string ) => {
    const synonymArray: any = [];

    const lookupResultCB = (response: any) => {
      for (let element of response ) {
        // console.log(element.synonyms);
        for (let word of element.synonyms) {
          if (!synonymArray.includes(word)) {
            synonymArray.push(word);
          }
        }
      }
      // biggerArray.push(synonymArray);
    };

    const luAdj = wordpos.lookupAdjective( result, lookupResultCB );
    return await luAdj.then( () => {
      // console.log(synonymArray, 'syn');
      biggerArray.push(synonymArray);
      // console.log(biggerArray, 'this is called my big array');
    } );
    

  };

  const adjectiveTest = await isAdjective(returnedWords); // creates array of words
  
  const allinOne = await adjectiveTest.forEach(getAdjResults);
  console.log(allinOne);

  return allinOne;

};
const abc = adjectiveLookup('i am a big strong bear');
console.log(abc, 'abc');
abc.then( (res: any) => console.log(res));

// export const adjectiveLookup = async (string: string) => {
//   wordpos.getAdjectives( string, (results: string[]) => {
//     console.log(results);
//     let array: string[] = [];
//     results.forEach( (result) => {
//       console.log(array);
//       wordpos.lookupAdjective(result)
//         .then((res: any) => {
//           console.log(array);
//           for (let item of res) {
//             if (item.pos === 's') {
//               array.push(item.syonyms);
//             }
//           }
//         });
//     });
//     console.log(array);
//   });
//   // return array;
// };

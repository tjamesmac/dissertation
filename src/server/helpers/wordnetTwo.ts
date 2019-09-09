import WordPos from 'wordpos';

const wordpos = new WordPos();

// right now all i need to do is loop through that array and construct an object with all the possibilities

export async function overAll( inputString: string ) {
  const testString = inputString;

  const getPartOfSpeech = async ( string: string ) => {
    const words = string;

    return await wordpos.getPOS( words, ( response: any ) => {
      return response;
    } );

  };
  // return getPartOfSpeech(testString);
  const confirmPOS = await getPartOfSpeech(testString);
  // console.log(confirmPOS.nouns);
  // console.log(confirmPOS.verbs);
  // console.log(confirmPOS.adjectives);
  // console.log(confirmPOS.adverbs);

  const obj: any = {};
  const returnPOS = (partOfSpeech: string) => {
    switch ( partOfSpeech ) {
      case 'verbs':
        return 'v';
      case 'adjectives':
        return 'a' || 's';
      case 'adverbs':
        return 'r';
      case 'nouns':
        return 'n';
      case 'rest':
        return 'rest';
      default:
        throw new Error();
    }
  };

  const lookupA = async ( array: string[], partOfSpeech: string ) => {
    const wordArray = array;
    const tempObj: any = {};
    console.log(partOfSpeech);
    console.log(returnPOS(partOfSpeech), 'this is the part of speech i need');
    const initialOfPOS = returnPOS(partOfSpeech);
    console.log(initialOfPOS);

    // this was for each but await doesn't work with it
    for (const word of wordArray) {
      tempObj[word] = [];
      tempObj[word][initialOfPOS] = [];
      await wordpos.lookup( word , ( response: any ) => {
        // console.log(word, 'this is called my word');
        console.log(response);
        for ( const element of response ) {
          const synonyms = element.synonyms;
          const speech = element.pos;
          
          console.log(speech, 'this is the speech part that I need to separate objects');
          console.log(synonyms);
          if (initialOfPOS === speech) {
          for ( const w of synonyms ) {
            if ( word !== w ) {
              if (!tempObj[word][initialOfPOS].includes(w)) {

                tempObj[word][initialOfPOS] = [ ...tempObj[word][initialOfPOS], ...[w] ];
              }
            }
          }
        }
        }
      });
    }
    console.log(tempObj);
    return tempObj;
  };
  for ( const pos of Object.keys(confirmPOS) ) {
    
    const partOf = confirmPOS[pos];
    const lookUpResult = await lookupA(await partOf, pos);
    // console.log(lookUpResult);
    obj[pos] = lookUpResult;
    // console.log('onto the next one', pos);
  }
  console.log(obj, 'this is my result object');
  return obj;
  
}

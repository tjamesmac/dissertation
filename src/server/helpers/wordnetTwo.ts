import WordPos from 'wordpos';

const wordpos = new WordPos();

export async function overAll( inputString: string ) {
  const testString = inputString;
  const getPartOfSpeech = async ( string: string ) => {
    const words = string;

    return await wordpos.getPOS( words, ( response: any ) => {
      return response;
    } );

  };
  const confirmPOS: any = await getPartOfSpeech(testString);

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
  const turnBackPOS = (partOfSpeech: string) => {
    switch ( partOfSpeech ) {
      case 'v':
        return 'verbs';
      case 'a':
      case 's':
        return 'adjectives';
      case 'r':
        return 'adverbs';
      case 'n':
        return 'nouns';
      case 'rest':
        return 'rest';
      default:
        throw new Error();
    }
  };

  const lookupWord = async ( words: string[], partOfSpeech: string ) => {
    const pos = returnPOS(partOfSpeech);
    const tempObject: any = {};
    for ( const word of words ) {
      tempObject[word] = [];

      await wordpos.lookup( word, ( response: any ) => {

        for ( const element of response ) {
          const synonyms = element.synonyms;
          const elementPOS = element.pos;
          if ( turnBackPOS(elementPOS) === turnBackPOS(pos) ) {

            for ( const w of synonyms ) {
              if ( word !== w ) {
                if (!tempObject[word].includes(w) && tempObject[word].length < 5) {

                  tempObject[word] = [ ...tempObject[word], ...[w] ];
                }
              }
            }
          }

        }
      } );
    }
    return tempObject;
  };

  const partOfSpeechKeys = Object.keys( await confirmPOS );

  const object: any = {};

  for ( const posKey of partOfSpeechKeys ) {
    object[posKey] = [];

    if (confirmPOS[posKey].length) {

      const lookupArray = await confirmPOS[posKey];

      const lookUpResult = await lookupWord( lookupArray, posKey);

      object[posKey] = await lookUpResult;
    }
  }
  return object;
}

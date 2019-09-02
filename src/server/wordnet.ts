import WordPos from 'wordpos';

const wordpos = new WordPos();

export async function overAll( inputString: string ) {
  const testString = inputString;

  const getAdjective = async ( string: string ) => {
    const words = string;

    return await wordpos.getAdjectives( words, ( response: any ) => {
      return response;
    } );

  };
  const confirmAdjective = getAdjective(testString);

  const lookupA = async ( array: string[] ) => {
    const wordArray = array;
    const obj: any = {};
    // this was for each but await doesn't work with it
    for (const word of wordArray) {
      obj[word] = [];
      await wordpos.lookupAdjective( word , ( response: any ) => {
        for ( const element of response ) {
          const synonyms = element.synonyms;
          console.log(synonyms);
          if (element.pos === 'a') {
            for (const w of synonyms) {
              if (word !== w) {
                if (!obj[word].includes(w)) {
                  obj[word] = [ ...obj[word], ...w ];
                }
              }

            }
          }
        }
      });
    }
    return obj;
  };
  return lookupA( await confirmAdjective );
}
// overAll().then( ( answer ) => console.log( answer, 'this is a thing' ) );

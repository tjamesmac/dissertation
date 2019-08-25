import WordPos from 'wordpos';

const wordpos = new WordPos();

export async function overAll() {
  const testString = 'this is my big strong string';

  const getAdjective = async ( string: string ) => {
    const words = string;

    return await wordpos.getAdjectives( words, ( response: any ) => {
      return response;
    } );

  };
  const confirmAdjective = getAdjective(testString);
  // return confirmAdjective;

  const lookupA = async ( array: string[] ) => {
    const wordArray = array;
    const obj: any = {};

    for (const word of wordArray) {
      console.log(word);
      obj[word] = [];
      console.log(word);
      await wordpos.lookupAdjective( word , ( response: any ) => {
        for ( let element of response ) {
          console.log(element.pos);
          const pos = element.synonyms;
          obj[word] = [ ...obj[word], ...pos ];
        }
      });
    }
    return obj;

  };
  return await lookupA( await confirmAdjective );
}
overAll().then( ( answer ) => console.log( answer, 'this is a thing' ) );

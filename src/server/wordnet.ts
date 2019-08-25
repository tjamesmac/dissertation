import WordPos from 'wordpos';

const wordpos = new WordPos();

export async function overAll() {
  const testString = 'this is my big strong string prickly furry small';
  const otherTest = `The BSc Chemistry course aims to give you a flexible and dynamic 
    education in the knowledge and skills needed to advance into a successful chemistry career.
    We aim to develop your research, mathematical and computational skills alongside 
    practical training.
    Accredited by the Royal Society of Chemistry, the course provides an excellent 
    platform to chemistry careers and is also a respected bridge to careers outside 
    of chemistry and related disciplines. The skills and knowledge gained throughout 
    the course can be applied in broader working contexts such as business, teaching or research.`;

  const getAdjective = async ( string: string ) => {
    const words = string;

    return await wordpos.getAdjectives( words, ( response: any ) => {
      return response;
    } );

  };
  const confirmAdjective = getAdjective(otherTest);
  // return confirmAdjective;

  const lookupA = async ( array: string[] ) => {
    const wordArray = array;
    const obj: any = {};
    // this was for each but await doesn't work with it
    for (const word of wordArray) {
      obj[word] = [];
      await wordpos.lookupAdjective( word , ( response: any ) => {
        for ( let element of response ) {
          const synonyms = element.synonyms;
          if (element.pos === 'a') {
            for (const w of synonyms) {
              if (!obj[word].includes(w)) {
                obj[word] = [ ...obj[word], ...w ];
              }
            }
          }
          // for (const w of synonyms) {
          //   if (!obj[word].includes(w)) {
          //     obj[word] = [ ...obj[word], ...w ];

          //   }
          // }
          // obj[word] = [ ...obj[word], ...pos ];
        }
      });
    }
    return obj;

  };
  return lookupA( await confirmAdjective );
}
overAll().then( ( answer ) => console.log( answer, 'this is a thing' ) );

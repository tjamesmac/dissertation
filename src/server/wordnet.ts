import WordPos from 'wordpos';

const wordpos = new WordPos();

export async function overAll() {
  console.log('i am working');
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
    // wordArray.forEach( async ( result ) => {
    //   // obj[result] = result;
    //   const getAdjData = wordpos.lookupAdjective( result, ( word: any ) => {
    //     // console.log(result)
    //     const object: any = {};
    //     object[result] = [];
    //     for ( let element of word ) {
    //       if ( element.pos === 'a' || element.pos === 's' ) {
    //         console.log(element.pos, result);
    //         const pos = element.pos;
    //         object[result] = [ ...object[result], ...pos ];
    //       }
    //     }
    //     Object.assign(obj, object);
    //     console.log(obj);
    //     return obj;
    //   })
    //   .then((res: any) => {
    //     console.log(res);
    //   })
    //   // this returns everything
    //   // console.log( await getAdjData, 'data' );
    //   console.log('am here');
    //   return getAdjData;
    // } );
    wordArray.forEach( ( word ) => {
      console.log(word);
    });
    obj.awesome = [];
    await wordpos.lookupAdjective('big', ( response: any ) => {
      for ( let element of response ) {
        console.log(element.pos);
        obj.awesome = [ ...obj.awesome, element.pos ];
      }
      // obj.awesome = response;
    });
    return obj;
  };
  return await lookupA( await confirmAdjective );
}
overAll().then( ( answer ) => console.log( answer, 'this is a thing' ) );

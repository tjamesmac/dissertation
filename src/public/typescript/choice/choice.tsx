import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { IPostObject } from './choice.interface';
import Option from './option.extra';

const Choice: React.FunctionComponent = () => {

  const [ choices, setChoices ] = React.useState();

  const [ redir, setRedir ] = React.useState();

  const fetchData = async () => {
    try {

      const URL = '/choice/data';
      const data = await fetch(URL);
      const response = await data;

      if ( response.status === 200 ) {
        const responseJSON = await response.json();
        console.log(responseJSON, 'choice response');

        const keys = Object.keys(responseJSON);

        if ( keys.length === 3 ) {
          const recentID = responseJSON.recent[0]._id;
          const male = responseJSON.male;
          const female = responseJSON.female;
          console.log(recentID);

          const all = [...male, ...female];
          const maleArr: any = [];
          const femaleArr: any = [];
          for ( const element of all ) {
            if (
                element.demographic === 'male'
                && maleArr.length === 0
                && element._id !== recentID
                ) {
              maleArr.push(element);
            }
            if (
                element.demographic === 'female'
                && femaleArr.length === 0
                && element._id !== recentID ) {
              femaleArr.push(element);
            }
          }
          const allAgain = [ ...femaleArr, ...maleArr ];
          console.log(allAgain);
          setChoices(allAgain);

        } else {
          setChoices( { error: 'not enough results yet. Thank you for participating.' } );
        }
      }
    } catch (error) {
      console.error('fetch results', error);
    }
  };
  useEffect( () => {
      fetchData();
  }, []);

  const choicePicker = async ( event: any ) => {
    const target = event.currentTarget;

    const text = target.innerText;
    const demo = target.getAttribute('data-demo');
    const getID = target.getAttribute('id');
    console.log(demo, 'demo');
    console.log(getID, 'id');
    console.log(text, 'text');

    const postObject: IPostObject = {
      value: text,
      demographic: demo,
      _id: getID,
    };

    try {
      const URL = '/choice/data';
      const data = fetch(URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postObject),
      });

      const response = await data;

      if ( response.status === 200 ) {
        console.log('made it');
        console.log(response);
        const responseJSON = await response.json();
        console.log(responseJSON);
        console.log(responseJSON.status, 'returned status');
        if ( responseJSON.status === 301 ) {
          console.log('I am awesome');
          setRedir(true);
        }
      }

    } catch (error) {
      console.error('post data', error);
    }
  };

  let optionMap;

  if (choices) {
    // added 'error handling'
    const keys = Object.keys(choices);
    if (keys.length > 1) {
      console.log(choices);
      optionMap = choices.map( ( options: any ) => {
        return (
          <Option
            key={ options._id }
            id={ options._id }
            data={ options.originalString }
            demo={ options.demographic }
            onClick={ ( e: any ) => choicePicker( e ) }
          />
        );
      } );
    }
  } else {
    return (
      <div className='loading'>Loading...</div>
    );
  }
  if ( redir ) {
    return <Redirect to='/final' />;
  }

  return (
      <div className='row'>
        <div className='col-12'>
          <h2 className='header'>Options!</h2>
          {choices ?
            (<p>Please pick one of the two options below.</p>)
             :
             (<div>Not enough results yet. Thank you for participating.</div>)
          }
          <div className='option-container'>
            {optionMap}
          </div>
          <button className='btn btn-primary' onClick={() => fetchData()}>Click</button>
        </div>
      </div>
  );
};

export default Choice;

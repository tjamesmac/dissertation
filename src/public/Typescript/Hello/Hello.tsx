import * as React from 'react';
const style = require('../../Scss/home.scss');
export interface IHelloProps { name: string; }

const fetchGraphQL = async () => {
  try {
    const query = `
    query {
      hello
    }
    `;

    const url = 'http://localhost:3000/graphql';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    };

    const fetchData = await fetch(url, options);
    const response = await fetchData;
    if (response.status === 200) {
      const responseJson = await response.json();
      const responseData = responseJson.data.hello;
      console.log(responseData);
      const target = document.getElementById('response');
      const p = document.createElement('p');
      const text = document.createTextNode(responseData);
      p.appendChild(text);
      if (target !== null) {
        target.appendChild(p);
      }
      console.log(responseJson);
    }

  } catch (error) {
    console.error('this is my error', error);
  }
};

export const Hello: React.FunctionComponent<{name: string}> = (props: IHelloProps) => {
  fetchGraphQL();
  return (
    <div>
      <h1 className='header'>Hello, {props.name}. Welcome back!</h1>
      <div id='response' className='response'>

      </div>
    </div>
  );
};

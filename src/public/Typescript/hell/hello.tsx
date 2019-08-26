import * as React from './node_modules/react';
// this now works like this?

export interface IHelloProps { name: string; }

// const fetchGraphQL = async () => {
//   try {
//     const query = `
//     query {
//       hello
//     }
//     `;

//     const url = 'http://localhost:3000/graphql';
//     const options = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ query }),
//     };

//     const fetchData = await fetch(url, options);
//     const response = await fetchData;
//     if (response.status === 200) {
//       const responseJson = await response.json();
//       const responseData = responseJson.data.hello;
//       console.log(responseData);
//       const target = document.getElementById('response');
//       const p = document.createElement('p');
//       const text = document.createTextNode(responseData);
//       p.appendChild(text);
//       if (target !== null) {
//         target.appendChild(p);
//       }
//       console.log(responseJson);
//     }

//   } catch (error) {
//     console.error('this is my error', error);
//   }
// };

export const Hello: React.FunctionComponent<{name: string}> = (props: IHelloProps) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <h1 className='header'>Hello, {props.name}. Welcome back!</h1>
        </div>
      </div>
    </div>
  );
};

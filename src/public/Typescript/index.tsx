import * as React from 'react';
import * as ReactDOM from 'react-dom';

const App = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div className='wrapper'>
      <div>
        <h1 className='page-title'>Hello world!</h1>
      </div>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          click me
        </button>
        <input id='text'></input>
        <button
          id='send'
          onClick={() => console.log('Hello this is working')}>
          This is my sender
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

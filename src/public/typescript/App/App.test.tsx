import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';
<<<<<<< HEAD:src/public/Typescript/App/App.test.tsx
import App from '../App/App';
=======
import { App } from './App';
>>>>>>> feature/heroku:src/public/typescript/App/App.test.tsx

describe('App component renders correctly', () => {
  it('renders as expected', () => {
    const result = shallow(<App/>);
    expect(result.exists()).toBe(true);
  });
  it('matches snapshot', () => {
    const tree = renderer
      .create(<App />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';
import { App } from './App';

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

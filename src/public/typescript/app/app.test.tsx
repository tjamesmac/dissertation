import { shallow } from 'enzyme';
import * as React from 'react';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';
import App from './app';

describe('App component renders correctly', () => {
  it('renders as expected', () => {
    const result = shallow(<App/>);
    expect(result.exists()).toBe(true);
  });
  it('matches snapshot', () => {
    const tree = renderer
      .create(
      <StaticRouter>
      <App />
      </StaticRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

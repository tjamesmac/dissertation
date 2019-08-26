import { shallow } from './node_modules/enzyme';
import * as React from './node_modules/react';
import renderer from './node_modules/react-test-renderer';
import App from './App';

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

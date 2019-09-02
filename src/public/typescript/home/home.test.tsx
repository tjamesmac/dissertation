import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';
import { Home } from './home';

describe('Hello component', () => {
  const name = 'Test';
  it('renders the Hello with a name', () => {
    const result = shallow(<Home />).contains(
      <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <h1 className='header'>Hello, Test. Welcome back!</h1>
        </div>
      </div>
    </div>);
    expect(result).toBeTruthy();
  });
  it('it renders correctly', () => {
    const tree = renderer
      .create(<Home/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

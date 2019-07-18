import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';
import { Hello } from './Hello';

describe('Hello component', () => {
  const name = 'Test';
  it('renders the Hello with a name', () => {
    const result = shallow(<Hello name={name}/>).contains(
    <div>
      <h1 className='header'>Hello, Test. Welcome back!</h1>
    </div>);
    expect(result).toBeTruthy();
  });
  it('it renders correctly', () => {
    const tree = renderer
      .create(<Hello name={name}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

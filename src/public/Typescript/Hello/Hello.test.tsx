import { shallow } from 'enzyme';
import * as React from 'react';
import renderer from 'react-test-renderer';
import { Hello } from './Hello';

describe('Test Hello component', () => {
  it('renders the heading with a name', () => {
    const result = shallow(<Hello name='Test'/>).contains(
    <div>
      <h1 className='header'>Hello, Test. Welcome back!</h1>
    </div>);
    expect(result).toBeTruthy();
  });
});

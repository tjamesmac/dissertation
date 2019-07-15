import { shallow } from 'enzyme';
import * as React from 'react';
import { Hello } from './Hello/Hello';

it('renders the heading with a name', () => {
  const result = shallow(<Hello name='Test'/>).contains(<h1>Hello, Test. Welcome back!</h1>);
  expect(result).toBeTruthy();
});

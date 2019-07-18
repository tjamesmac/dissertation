import { shallow } from 'enzyme';
import * as React from 'react';
import { App } from './index';

it('renders the heading with a name', () => {
  const result = shallow(<App/>).contains(
  <div>
    <h1 className='header'>Hello, Thomas. Welcome back!</h1>
  </div>);
  expect(result).toBeTruthy();
});

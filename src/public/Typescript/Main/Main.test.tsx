import * as React from 'react';
import renderer from 'react-test-renderer';
import { Main } from './Main';

describe('Main page component', () => {

  it('it renders correctly', () => {
    const tree = renderer
      .create(<Main />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

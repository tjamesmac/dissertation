import * as React from 'react';
import renderer from 'react-test-renderer';
import TextArea from './TextArea';

describe('Main page component', () => {

  it('it renders correctly', () => {
    const tree = renderer
      .create(<TextArea/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

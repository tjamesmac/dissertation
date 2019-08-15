import * as React from 'react';
import renderer from 'react-test-renderer';
import Modal from './Modal';

describe('Main page component', () => {

  it('it renders correctly', () => {
    const tree = renderer
      .create(<Modal words={['one', 'two']} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

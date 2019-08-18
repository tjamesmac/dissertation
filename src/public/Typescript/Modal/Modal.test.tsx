import * as React from 'react';
import renderer from 'react-test-renderer';
import Modal from './Modal';

describe('Main page component', () => {

  it('it renders correctly', () => {
    const modalPosition = {top: 1, left: 2};
    const tree = renderer
      .create(<Modal words={['one', 'two']} position={modalPosition} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

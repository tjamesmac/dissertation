import * as React from 'react';
import renderer from 'react-test-renderer';
import Modal from './modal';

describe('Main page component', () => {

  it('it renders correctly', () => {
    const modalPosition = {top: 1, left: 2};
    const modalWords = { word: 'hello', synonyms: ['hi', 'hiya']};
    const tree = renderer
      .create(<Modal
                hover={() => console.log('test')}
                removeHover={() => console.log('test')}
                words={modalWords}
                position={modalPosition}
                onWordClick={() => console.log('test')}
              />,
              )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

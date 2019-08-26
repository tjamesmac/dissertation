import * as React from './node_modules/react';
import renderer from './node_modules/react-test-renderer';
import Modal from './Modal';

describe('Main page component', () => {

  it('it renders correctly', () => {
    const modalPosition = {top: 1, left: 2};
    const modalWords = { word: 'hello', synonyms: ['hi', 'hiya']};
    const tree = renderer
      .create(<Modal
                words={modalWords}
                position={modalPosition}
                onWordClick={() => console.log('hello')}
              />,
              )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

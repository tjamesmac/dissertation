import * as React from 'react';
import renderer from 'react-test-renderer';
import TextArea from './TextArea';

describe('Main page component', () => {

  const response = [
    {
    word: 'hello',
    type: 'adjective',
    synonyms: ['hi', 'hiya'],
    }
  ];
  it('it renders correctly', () => {
    const tree = renderer
      .create(<TextArea response={response}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
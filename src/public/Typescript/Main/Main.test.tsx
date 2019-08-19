import * as React from 'react';
import renderer from 'react-test-renderer';
import { validateWords } from './helpers';
import { Main } from './Main';

describe('Main page component', () => {

  it('it renders correctly', () => {
    const tree = renderer
      .create(<Main />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('testing', () => {
  it('should add color to word if it is an adjective', () => {

    const dummyData = [
      {
        word: 'testing',
        type: 'adjective',
        synonyms: ['examining'],
      },
    ];
    expect(validateWords(dummyData))
      .toEqual(`this is my <span style='color: green'>testing</span> string`);
  });
});

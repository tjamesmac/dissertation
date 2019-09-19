import * as React from 'react';
import renderer from 'react-test-renderer';
import { Main } from './main';
import { validateWords } from './main.helpers';

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
    const dummyString = 'this is my testing string';
    const dummyData = [
      {
        word: 'testing',
        type: 'adjective',
        synonyms: ['examining'],
      },
    ];
    expect(validateWords(dummyData, dummyString))
      .toEqual(
        {
          initialGendered: {
            female: [],
            male: [],
          },
          updatedString: 'this is my testing string&#8203;',
          valid: ['word', 'type', 'synonyms'],
        },
      );
  });
});

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
    const validationString = 'this is my testing string';
    const dummyData = [
      {
        word: 'testing',
        type: 'adjective',
        synonynms: ['examining'],
      },
    ];
    expect(validateWords(dummyData, validationString)).toEqual(`this is my <span style='color: green'>testing</span> string`)
  });
});

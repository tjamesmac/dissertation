import * as React from 'react';
import renderer from 'react-test-renderer';
import { IResponse } from '../main/Main.interface';
import TextArea from './TextArea';

describe('Main page component', () => {

  const response: IResponse = { synonyms: ['hi', 'hiya'] };

  it('it renders correctly', () => {
    const tree = renderer
      .create(<TextArea response={response}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

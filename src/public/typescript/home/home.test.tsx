import { shallow } from 'enzyme';
import * as React from 'react';
import { StaticRouter } from 'react-router';
import { Link } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Home } from './home';

describe('Hello component', () => {
  const name = 'Test';
  it('renders the Hello with a name', () => {
    const result = shallow(<Home />).contains(
      <div className='row'>
      <div className='col-12'>
        <h2>Welcome!</h2>
        <div className='info'>
          <p>
            This program has been built to
            help see whether a job advert contains male or female gendered words.
          </p>
          <p>
            After clicking on the start button below,
            you will be presented with a text input area.
          </p>
          <p>
            You will be able to copy and paste text into
            the input area. After doing so, any words
            that can be edited will be highlighted.
            Hovering over them will allow you to change the word with a synonym that is available.
          </p>
          <p>
            If you decided to modify any of the words manually,
             you can press the check button again to see if there are
             any available words for your edit.
          </p>
          <p>
            When you have submitted the changes to your advert, you will
            be able to choose from two previous posted adverts.
          </p>
          <p>
            Choosing one of the previous adverts will present you with an end page.
          </p>
          <p>
            Thank you for taking part!
          </p>
        </div>
      <Link to='/main' className='btn btn-primary'>Start</Link>
      </div>
    </div>);
    expect(result).toBeTruthy();
  });
  it('it renders correctly', () => {
    const tree = renderer
      .create(
        <StaticRouter>
        <Home />
        </StaticRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

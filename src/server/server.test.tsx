import { mount, shallow  } from 'enzyme';
import request from 'supertest';
import Server from './server';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Home } from '../public/typescript/home/home';
import { htmlTemplate } from './htmlTemplate';

describe('my server', () => {
  const app = new Server().app;
  it('should respond with 200', (done) => {
    request(app).get('/').then((response: any) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

});
describe('server template', () => {
  it('should match template with no props', () => {
    const html = htmlTemplate();
    expect(html).toMatch(htmlTemplate());
  });
  it('prop should render with correct value', () => {
    const props = {
      name: 'Test',
    };
    const homeComponent = mount(<Home />);
    expect(homeComponent.prop('name')).toEqual('Test');
  });
  it('should match template', () => {
    const home = <Home />;
    const reactDom = renderToString(home);
    const html = htmlTemplate(reactDom);
    expect(html).toMatch(htmlTemplate(reactDom));
  });
});

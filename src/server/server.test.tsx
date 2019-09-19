import { mount, shallow  } from 'enzyme';
import request from 'supertest';
import Server from './server';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
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
  it('should match template', () => {
    const home = <StaticRouter><Home/></StaticRouter>
    ;
    const reactDom = renderToString(home);
    const html = htmlTemplate(reactDom);
    expect(html).toMatch(htmlTemplate(reactDom));
  });
});

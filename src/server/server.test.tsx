import request from 'supertest';
import Server from './server';

describe('my server', () => {
  const app = new Server().app;
  it('should respond with 200', (done) => {
    request(app).get('/').then((response: any) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

import request from 'supertest';
import Server from './server';

describe('my server', () => {
  const server = new Server(4000);
  const app = server.getApp();
  it('runs instance of server class', () => {
    expect(server).toBeInstanceOf(Server);
  });
  it('should respond with 200', (done) => {
    request(app).get('/').then((response: any) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

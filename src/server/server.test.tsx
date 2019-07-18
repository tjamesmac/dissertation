import request from 'supertest';
import Server from './server';

it('runs instance of server class', () => {
  const server: any = new Server(4000);
  expect(server).toBeInstanceOf(Server);
});

describe('Test the root path', () => {
  const server = new Server(4000);
  const app = server.getApp();
  test('it should response the GET method', (done) => {
    request(app).get('/').then((response: any) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

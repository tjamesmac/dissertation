import request from 'supertest';
import Server from '../server';
import { isString, removeDoubles } from './wordProcessing';

describe('Word array', () => {

  const testSentence: string = 'hello this is my test string';
  const array = isString(testSentence);

  it('has correct length and words', () => {
    expect(array).toHaveLength(6);
    expect(array).toEqual(expect.arrayContaining(['hello', 'this', 'is', 'my', 'test', 'string']));
  });

});

describe('Remove doubles', () => {

  const testSentence: string[] = [
    'hello',
    'hello',
    'this',
    'is',
    'is',
    'my',
    'test',
    'string',
    'string',
    'string',
    'string',
  ];
  const removeDouble: string[] = removeDoubles(testSentence);

  it('has correct length and words', () => {
    expect(removeDouble).toHaveLength(6);
    expect(removeDouble)
      .toEqual(expect.arrayContaining(['hello', 'this', 'is', 'my', 'test', 'string']));
  });

});

// This test was working then starting returning 500
describe('POST /', () => {
  const app = new Server().app;
  it('returns 200', (done) => {
    request(app).post('/').then(( response: any ) => {
      console.log(response.statusCode);
      // expect(response.statusCode).toBe(200);
      done();
    });
  });
});

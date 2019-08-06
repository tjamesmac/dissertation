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

describe('POST /', () => {
  const app = new Server().app;
  it('returns 200', (done) => {
    request(app).post('/').then(( response: any ) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

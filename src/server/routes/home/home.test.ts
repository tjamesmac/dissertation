import request from 'supertest';
import Server from '../../server';

describe('loading express', () => {
  let server: any = new Server();
  beforeEach( () => {
    server = server.app;
  } );
  it( 'responds to /', ( done ) => {
    request(server)
      .get('/')
      .expect( 200, done );
  } );
} );

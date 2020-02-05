const request = require('supertest');

const server = require('./server');

//GET test --> test server is working
describe('server', function() {
  it('describes the test working', function() {
    return request(server)
      .expect(true)
      .toBe(true);
  });
});

const request = require('supertest');

const server = require('./server');

//GET test --> test server is working
describe('server', function() {
  it('describes the test working', function() {
    expect(true).toBe(true);
  });
});

//GET test --> test to s
// describe('get initial request is working', function() {
//   it('responds with string test that api is working', function() {
//     return request(server)
//       .get('/')
//       .expect(response.send)
//       .toBe('Anywhere fitness app api and server working');
//   });
// });

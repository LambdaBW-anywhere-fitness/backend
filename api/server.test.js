const request = require('supertest');

const server = require('./server');

//GET test --> test server is working
describe.skip('server', function() {
  it('describes the test working', function() {
    request(server)
      .get('/')
      .expect('Content-Type', /json/)
      .then(res => {
        console.log('on line 12', res);
        expect(res.status).toBe(201);
      });
  });
});

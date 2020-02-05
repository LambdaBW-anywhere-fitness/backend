const request = require('supertest');
const server = require('../api/server');

describe('POST /login', function() {
  it('sends login and returns with json', function() {
    request(server)
      .post('/api/login')
      .send({ username: 'ironman', password: 'ironman' })
      .set('Accept', 'application/json')
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
});

describe('POST / register', function() {
  it('registers a user and returns with json', function() {
    request(server)
      .post('/api/register')
      .send({
        username: 'superman',
        email: 'superman@test.com',
        password: 'superman',
        role: 'instructor'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
});

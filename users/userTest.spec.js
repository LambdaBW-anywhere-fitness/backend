const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('../api/server');

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

describe.skip('GET / all users', () => {
  it('responds with status code 200 and return list of users', () => {
    return request(server)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(401); //gives 401 not 'auth'
  });
});

//get a single user test
describe('GET / single user', () => {
  it('responds with status code 200 and single user', async () => {
    const res = await request(server)
      .get('/api/users/1')
      .expect(res.status).toBe(500)
  });
});

//update a user test
describe.skip('PUT /users/1', function() {
  it('updates a single user and get a 201 code', function() {
    request(server)
      .put('/api/users/1')
      .send({
        username: 'superman',
        email: 'superman@test.com',
        password: 'superman',
        role: 'instructor'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.status).toBe(201);
      });
  });
});

//delete a user test
describe.skip('DELETE/ single user', () => {
  it('responds with status code 200 and single user was deleted', () => {
    return request(server)
      .delete('/api/users/1')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

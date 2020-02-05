const request = require('supertest');
// const db = require('../database/dbConfig');
const server = require('../api/server');

// beforeEach(() => {
//   return db.migrate
//     .rollback()
//     .then(() => db.migrate.latest())
//     .then(() => db.seed.run());
// });

describe('GET / all users', () => {
  it('responds with status code 200 and return list of users', () => {
    return request(server)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('GET / single user', () => {
  it('responds with status code 200 and single user', () => {
    return request(server)
      .get('/api/users/1')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

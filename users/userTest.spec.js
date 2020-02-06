const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('../api/server');

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

//get all users
describe('GET / all users user', () => {
  it('responds with status code 200 and single user', async () => {
    const res = await request(server).get('/api/users');
    expect(res.status).toBe(200);
  });
});

//get a single user test
describe('GET / single user', () => {
  it('responds with status code 200 and single user', async () => {
    const res = await request(server).get('/api/users/1');
    expect(res.status).toBe(200);
  });
});

//update a user test
describe('PUT /users/1', () => {
  it('updates a single user and get a 201 code', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        username: 'superman',
        email: 'superman@test.com',
        password: 'superman',
        role: 'instructor'
      });
    const edit = await request(server)
      .put('/api/users/1')
      .send({
        username: 'superman100',
        email: 'superman100@test.com',
        password: 'superman100',
        role: 'instructor'
      });
    expect(edit.status).toBe(201);
  });
});

// //delete a user test
// describe('DELETE/ single user', () => {
//   it('responds with status code 200 and single user was deleted', () => {
//     return request(server)
//       .delete('/api/users/1')
//       .set('Content-Type', 'application/json')
//       .expect(200);
//   });
// }); //all tests are inside one describe block

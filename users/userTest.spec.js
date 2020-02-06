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
    // console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(10);
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
      .post('/api/auth/register')
      .send({
        username: 'spiderman',
        email: 'spiderman@test.com',
        password: 'spiderman',
        role: 'instructor'
      });
    const edit = await request(server)
      .put('/api/users/11')
      .send({
        username: 'superman100',
        email: 'superman100@test.com',
        password: 'superman100',
        role: 'instructor'
      });
    console.log(edit.body);
    expect(edit.status).toBe(201);
    expect(edit.body).not.toMatchObject({ username: 'superman' });
  });
});

// //delete a user test
describe('DELETE/ single user', () => {
  it('responds with status code 200 and single user was deleted', async () => {
    const res = await request(server).delete('/api/users/1');
    // console.log(res.body);
    // .set('Content-Type', 'application/json')
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
  });
}); //all tests are inside one describe block

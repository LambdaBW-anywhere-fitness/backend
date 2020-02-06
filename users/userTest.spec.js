const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('../api/server');

beforeEach(() => {
  return db.migrate.rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

describe('GET / all users', () => {
  it('responds with status code 200 and return list of users', async () => {
    const res = await request(server)
      .get('/api/users')
      expect(res.status).toBe(200) //gives 401 not 'auth'
  });
});

//get a single user test
describe('GET / single user', () => {
  it('responds with status code 200 and single user', async () => {
    const res = await request(server)
      .get('/api/users/1')
      expect(res.status).toBe(200)
  });
});

//update a user test
describe('PUT /users/1', () => {
  it('updates a single user and get a 201 code', async () => {
    const res = request(server)
      .post('/api/auth/register')
      .send({
        username: 'Hi', password:'hello', email:'hello@gmail.com', role: 'instructor'
      })
      const edit = await request(server)
      .put('/api/users/1')
      .send({username: 'GoodBye'})
      expect(edit.status).toBe(201)
  });
});

//delete a user test
describe('DELETE/ single user', () => {
  it('responds with status code 200 and single user was deleted', async () => {
    const res =  request(server)
      .post('/api/auth/register')
      .send({username: "Hello", password: "hello", email: "Hello@hello.com", role:"instructor"})
      const edit = await request(server)
      .delete('/api/users/1')
      expect(edit.body).toBe(4)
  });
});

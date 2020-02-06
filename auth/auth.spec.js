const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('../api/server');
// const cleaner = require('knex-cleaner');

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

describe('POST / register', () => {
  it('registers a user and returns with json', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'spiderman',
        email: 'spiderman@test.com',
        password: 'spiderman',
        role: 'instructor'
      });
    expect(res.status).toBe(200);
  });
});

describe('login', () => {
  it('should return status 201', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'spiderman',
        email: 'spiderman@test.com',
        password: 'spiderman',
        role: 'instructor'
      });
    const res2 = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'spiderman',
        password: 'spiderman'
      });
    // console.log(res2.body);
    expect(res2.status).toBe(200);
    expect(res2.body.user).toHaveProperty('id');
    expect(res2.body.user).toHaveProperty('token');
    expect(res2.body.user).toMatchObject({ role: 'instructor' });
  });
});

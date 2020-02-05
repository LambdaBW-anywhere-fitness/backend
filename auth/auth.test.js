const request = require('supertest');
const db = require('../database/dbConfig');
const cleaner = require('knex-cleaner');
const server = require('../api/server');

// beforeEach(() => {
//   return db.migrate
//     .rollback()
//     .then(() => db.migrate.latest())
//     .then(() => db.seed.run());
// });

describe('POST / register', function() {
  beforeEach(async () => {
    await cleaner.clean(db, {
      ignoreTables: ['knex migrations', 'knex migrations_lock']
    });
  });

  it('registers a user and returns with json', function() {
    return request(server)
      .post('/api/auth/register')
      .send({
        username: 'kingkong',
        email: 'kingkong@test.com',
        password: 'kingkong',
        role: 'instructor'
      })
      .set('Content-Type', 'application/json')
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
});

describe('login', () => {
  it('should return status 201', () => {
    return request(server)
      .post('/api/auth/login')
      .send({
        username: 'kingkong',
        password: 'kingkong'
      })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.user.username).toBe('kingkong');
      });
  });
});

// describe.skip('POST /login', function() {
//   it('sends login and returns with json', function() {
//     request(server)
//       .post('/api/auth/login')
//       .send({ username: 'ironman', password: 'ironman' })
//       .set('Accept', 'application/json')
//       .then(res => {
//         expect(res.status).toBe(200);
//       });
//   });
// });

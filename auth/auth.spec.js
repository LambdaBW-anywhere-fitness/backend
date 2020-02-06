const request = require('supertest');
const db = require('../database/dbConfig')
const server = require('../api/server');



beforeEach(() => {
    return db.migrate.rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run())
})



describe('POST / register', () => {
  it('registers a user and returns with json', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'superman',
        email: 'superman@test.com',
        password: 'superman',
        role: 'instructor'
      })
      expect(res.status).toBe(200)
  });
});

describe('POST /login', () => {
  it('sends login and returns with json', async () => {
    const res = await request(server)
    .post('/api/auth/register')
    .send({
      username: 'superman',
      email: 'superman@test.com',
      password: 'superman',
      role: 'instructor'
    })
    .then( async() => {
        const response = await request(server)
        .post('/api/auth/login')
         .send({username: 'superman', password: 'superman'})
         expect(response.status).toBe(200)
        //  console.log(res.body) 
    })
  });
});

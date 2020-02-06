const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('../api/server');

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

// //GET test --> test server is working
describe('server', function() {
  it('describes the test working', async function() {
    const res = await request(server).get('/');
    expect(res.type).toBe('application/json');
    expect(res.status).toBe(200);
  });
});

const request = require('supertest');
const server = require('../api/server');

//get a single user test
describe.skip('GET / single user', () => {
  it('responds with status code 200 and single user', () => {
    return request(server)
      .get('/api/users/1')
      .set('Content-Type', 'application/json')
      .expect(200);
  });
});

//update a user test
describe('PUT /users/1', function() {
  it('updates a single user and get a 201 code', function() {
    request(server)
      .put('/api/users/1')
      .send({
        username: 'superman',
        email: 'superman@test.com',
        password: 'superman',
        role: 'instructor'
      })
      .set('Content-Type', 'application/json')
      .then(res => {
        expect(res.status).toBe(201);
      });
  });
});

//delete a user test
describe('DELETE/ single user', () => {
  it('responds with status code 200 and single user was deleted', () => {
    return request(server)
      .delete('/api/users/1')
      .set('Content-Type', 'application/json')
      .expect(200);
  });
}); //all tests are inside one describe block

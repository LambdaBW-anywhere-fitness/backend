const server = require('../api/server');
const request = require('supertest');
const db = require('../database/dbConfig');
const restricted = require('../middleware/middle-ware');

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

describe('Get all classes', () => {
  it('GET /api/classes', async () => {
    const res = await request(server).get('/api/classes');
    expect(res.status).toBe(200);
  });
});

describe('Get all classes error(500)', () => {
  it('GET /api/classes', async () => {
    const res = await request(server).get('/api/classes');
    expect(res.type).toMatch(/json/i);
  });
});

describe('Post a class', () => {
  it('POST /api/classes', async () => {
    const res = await request(server)
      .post('/api/classes')
      .send({ class_name: 'basketball', class_duration: '2 hours', class_intensity_level: 'medium', class_city: 'Las Vegas', start_time: '7am' });
    expect(res.body.class_name).toBe('basketball');
  });
});

describe('register a user', () => {
  it('POST /api/auth/register', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Abel', email: 'Able@aol.com', password: 'abel123', role: 'attendee' });
    expect(res.status).toBe(200);
  });
});

describe('login a user', () => {
  it('POST /api/auth/login', async () => {
    const signup = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Abel', email: 'Able@aol.com', password: 'abel123', role: 'attendee' })
      .then(async () => {
        const res = await request(server)
          .post('/api/auth/login')
          .send({ username: 'Abel', password: 'abel123' });
        expect(res.status).toBe(200);
        //  console.log(res.body)
        expect(res.body.user.role).toBe('attendee');
      });
  });
});

describe('Put a class', () => {
  it('Put /api/classes/1', async () => {
    const res = await request(server)
      .post('/api/classes')
      .send({ class_name: 'basketball', class_duration: '2 hours', class_intensity_level: 'medium', class_city: 'Las Vegas', start_time: '7am' });
    const edit = await request(server)
      .put('/api/classes/1')
      .send({ class_name: 'Hockey' });
    expect(edit.status).toBe(201);
  });
});

describe('DELETE/ single class', () => {
  it('responds with status code 200 and single class was deleted', async () => {
    const res = await request(server).delete('/api/classes/1');
    // console.log(res.body);
    // .set('Content-Type', 'application/json')
    expect(res.status).toBe(201);
    expect(res.type).toBe('application/json');
  });
});

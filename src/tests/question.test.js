const request = require('supertest');
const app = require('../app');

describe('Question API', () => {
  let token;

  beforeAll(async () => {
    // Create a user and log in to get a token
    await request(app)
      .post('/api/users')
      .send({
        email: 'questionuser@example.com',
        password: 'password123'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'questionuser@example.com',
        password: 'password123'
      });

    token = res.body.token;
  });

  it('should create a new question', async () => {
    const res = await request(app)
      .post('/api/questions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'What is the capital of Italy?'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('content', 'What is the capital of Italy?');
  });

  it('should retrieve a specific question', async () => {
    const res = await request(app)
      .get('/api/questions/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('content', 'What is the capital of Italy?');
  });

  it('should retrieve all questions asked by the user', async () => {
    const res = await request(app)
      .get('/api/users/1/questions')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty('content', 'What is the capital of Italy?');
  });
});

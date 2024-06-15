const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models'); // Assuming you are using Sequelize

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Ensure the database is in a known state
});

describe('User API', () => {
  let token;

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', 'testuser@example.com');
  });

  it('should log in the user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should retrieve user profile', async () => {
    const res = await request(app)
      .get('/api/users/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('email', 'testuser@example.com');
  });
});

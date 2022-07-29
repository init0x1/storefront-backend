import app from '../../server';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';

const request = supertest(app);
const testUser = {
  first_name: 'Abdelrahman',
  last_name: 'Ali',
  password: 'A123159A',
};

const token = jwt.sign(testUser, process.env.TOKEN_SECRET as string);

describe('Users Endpoints Test', () => {
  it('test index() /users ', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(401);
  });
  it('test index() /users with jwt', async () => {
    const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('test show() /users/:id ', async () => {
    const response = await request.get('/users/1');
    expect(response.status).toBe(401);
  });
  it('test show() /users/:id with a jwt ', async () => {
    const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('test create() /users', async () => {
    const response = await request.post('/users').send({
      first_name: 'Abdelrahman',
      last_name: 'Ali',
      password: 'A123159A',
    });
    expect(response.status).toBe(200);
  });

  it('test delete() /orders', async () => {
    const response = await request.delete('/orders').send({
      id: 1,
    });
    expect(response.status).toBe(401);
  });

  it('test delete() /orders with jwt', async () => {
    const response = await request
      .delete('/orders')
      .send({
        id: 1,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('test update() /users', async () => {
    const response = await request.put('/users').send({
      id: 1,
      first_name: 'Abdelrahman',
      last_name: 'Ali',
      password: 'A123159A',
    });
    expect(response.status).toBe(401);
  });

  it('test update() /users with jwt ', async () => {
    const response = await request
      .put('/users')
      .send({
        id: 1,
        first_name: 'Abdo',
        last_name: 'Ali',
        password: 'password123@@',
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

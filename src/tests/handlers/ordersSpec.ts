import app from '../../server';
import { User, UsersModel } from '../../models/users';
import { Product, ProductsModel } from '../../models/products';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import Client from '../../database';

const user = new UsersModel();
const product = new ProductsModel();

const request = supertest(app);

const testUser = {
  first_name: 'Abdelrahman',
  last_name: 'Ali',
  password: 'A123159A',
};

const testProduct = {
  id: 1,
  name: 'hp430G',
  price: 1200,
};

const token = jwt.sign(testUser, process.env.TOKEN_SECRET as string);

describe('Orders Endpoints Test', () => {
  beforeAll(async () => {
    await user.create(testUser as User);

    await product.create(testProduct as Product);
  });

  it('test index() /orders ', async () => {
    const response = await request.get('/orders');
    expect(response.status).toBe(401);
  });
  it('test index() /orders with jwt', async () => {
    const response = await request.get('/orders').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('test show() /orders/:id ', async () => {
    const response = await request.get('/orders/1');
    expect(response.status).toBe(401);
  });
  it('test show() /orders/:id with a jwt ', async () => {
    const response = await request.get('/orders/1').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('test create() /orders', async () => {
    const response = await request.post('/orders').send({
      status: 'test1',
      user_id: 1,
    });
    expect(response.status).toBe(401);
  });

  it('test create() /orders with a jwt', async () => {
    const response = await request
      .post('/orders')
      .send({
        status: 'test1',
        user_id: 1,
      })
      .set('Authorization', `Bearer ${token}`);
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

  it('test update() /orders', async () => {
    const response = await request.put('/orders').send({
      id: 1,
      status: 'test2',
      user_id: 1,
    });
    expect(response.status).toBe(401);
  });

  it('test update() /orders with jwt ', async () => {
    const response = await request
      .put('/orders')
      .send({
        id: 1,
        status: 'test2',
        user_id: 1,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  afterAll(async () => {
    const conn = await Client.connect();
    await conn.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    await conn.query(
      'DELETE FROM products;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;'
    );
    conn.release();
  });
});

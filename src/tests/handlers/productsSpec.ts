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

describe('products Endpoints Test', () => {
  it('test index() /products ', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('test show() /products/:id ', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });

  it('test create() /products', async () => {
    const response = await request.post('/products').send({
      name: 'test products',
      price: 99,
    });
    expect(response.status).toBe(401);
  });

  it('test create() /products with a jwt', async () => {
    const response = await request
      .post('/products')
      .send({
        name: 'test products',
        price: 99,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('test delete() /products', async () => {
    const response = await request.delete('/products').send({
      id: 1,
    });
    expect(response.status).toBe(401);
  });

  it('test delete() /products with jwt', async () => {
    const response = await request
      .delete('/products')
      .send({
        id: 1,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('test update() /products', async () => {
    const response = await request.put('/products').send({
      id: 1,
      name: 'test2',
      price: 1024,
    });
    expect(response.status).toBe(401);
  });

  it('test update() /products with jwt ', async () => {
    const response = await request
      .put('/products')
      .send({
        id: 1,
        name: 'test2',
        price: 1024,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

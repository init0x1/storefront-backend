import { Order, OrdersModel } from '../../models/orders';
import { User, UsersModel } from '../../models/users';
import { Product, ProductsModel } from '../../models/products';
import jwt from 'jsonwebtoken';
import Client from '../../database';

const order = new OrdersModel();
const user = new UsersModel();
const product = new ProductsModel();

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

describe('Order Model Test', () => {
  beforeAll(async () => {
    await user.create(testUser as User);

    await product.create(testProduct as Product);
  });

  it('should have an index method', () => {
    expect(order.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(order.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(order.create).toBeDefined();
  });
  it('should have a update method', () => {
    expect(order.update).toBeDefined();
  });
  it('A method that delete an order', () => {
    expect(order.delete).toBeDefined();
  });
  it('should have a add product to order method', () => {
    expect(order.addProduct).toBeDefined();
  });

  it('test order create method ', async () => {
    const orderSpec = await order.create({ status: 'testing', user_id: 1 } as Order);
    expect(orderSpec).toEqual({
      id: 1,
      status: 'testing',
      user_id: 1,
    });
  });
  it('show all orders', async () => {
    const result = await order.index();
    expect(result).toEqual([
      {
        id: 1,
        status: 'testing',
        user_id: 1,
      },
    ]);
  });
  it('show method to show specific order', async () => {
    const result = await order.show(1);
    expect(result).toEqual({
      id: 1,
      status: 'testing',
      user_id: 1,
    });
  });

  it('update method to update the order', async () => {
    const result = await order.update(1, 'update Status');
    expect(result).toEqual({
      id: 1,
      status: 'update Status',
      user_id: 1,
    });
  });

  it('delete method to delete the order', async () => {
    await order.delete(1);
    const result = await order.index();
    expect(result).toEqual([]);
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

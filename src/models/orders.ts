import Client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export class OrdersModel {
  //getAllOrders
  async index(): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get all the orders: ${error}`);
    }
  }

  //getOrder
  async show(id: number): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to get the order error: ${error}`);
    }
  }

  //createOrder
  async create(o: Order): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = 'INSERT INTO orders (status,user_id) VALUES($1, $2) RETURNING *';
      const result = await connection.query(sql, [o.status, o.user_id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to add the order error: ${error}`);
    }
  }

  //deleteOrder
  async delete(id: number): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const SQL = 'DELETE FROM ordered_products WHERE id=($1)';
      await connection.query(SQL, [id]);
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to delete order ${id} error: ${error}`);
    }
  }

  //updateOrder
  async update(id: number, status: string): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = 'UPDATE orders SET status=($2) WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id, status]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to update order ${id} error: ${error}`);
    }
  }

  //addProduct
  async addProduct(quantity: number, order_id: string, product_id: string): Promise<Order> {
    try {
      const sql =
        'INSERT INTO ordered_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const connection = await Client.connect();
      const result = await connection.query(sql, [quantity, order_id, product_id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to Add Product ${error}`);
    }
  }
}

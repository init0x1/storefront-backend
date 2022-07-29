import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductsModel {
  //getAllProducts
  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get The Products error: ${error}`);
    }
  }

  //getProduct
  async show(id: number): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to get the product with the id ${id} error: ${error}`);
    }
  }

  //createProduct
  async create(p: Product): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = 'INSERT INTO products (name,price) VALUES($1, $2) RETURNING *';
      const result = await connection.query(sql, [p.name, p.price]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to Create product error: ${error}`);
    }
  }

  //deleteProduct
  async delete(id: number): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to delete product ${id} error: ${error}`);
    }
  }

  async update(p: Product): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = 'UPDATE products SET name=($3), price=($2) WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [p.id, p.price, p.name]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to update product error: ${error}`);
    }
  }
}

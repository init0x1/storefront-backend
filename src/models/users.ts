import Client from '../database';
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUND;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};

export class UsersModel {
  //getAllUsers
  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT id, first_name, last_name FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get users error: ${error}`);
    }
  }

  //getUser
  async show(id: number): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT id, first_name, last_name FROM users WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to get user ${id} error: ${error}`);
    }
  }

  //createUser
  async create(u: User): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql =
        'INSERT INTO users (first_name,last_name,password) VALUES($1, $2, $3) RETURNING id, first_name, last_name ';
      const hashing = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds as string));
      const result = await connection.query(sql, [u.first_name, u.last_name, hashing]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to create ${u.first_name + ' ' + u.last_name} error: ${error}`);
    }
  }

  //deleteUser
  async delete(id: number): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING id, first_name, last_name';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to delete user ${id} error: ${error}`);
    }
  }

  //updateUser
  async update(u: User): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql =
        'UPDATE users SET first_name=($2), last_name=($3), password=($4)  WHERE id=($1) RETURNING id, first_name, last_name';
      const hashing = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds as string));
      const result = await connection.query(sql, [u.id, u.first_name, u.last_name, hashing]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to update ${u.id} error: ${error}`);
    }
  }
}

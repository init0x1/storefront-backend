import { User, UsersModel } from '../../models/users';
import jwt from 'jsonwebtoken';

const user = new UsersModel();

const testUser = {
  first_name: 'Abdelrahman',
  last_name: 'Ali',
  password: 'A123159A',
};
const token = jwt.sign(testUser, process.env.TOKEN_SECRET as string);

describe('user Model Test', () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(user.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(user.create).toBeDefined();
  });
  it('should have a update method', () => {
    expect(user.update).toBeDefined();
  });
  it('A method that delete an order', () => {
    expect(user.delete).toBeDefined();
  });

  it('test order create method ', async () => {
    const userSpec = await user.create(testUser as User);
    expect(userSpec as unknown).toEqual({
      id: 1,
      first_name: 'Abdelrahman',
      last_name: 'Ali',
    });
  });
  it('show all users', async () => {
    const result = await user.index();
    expect(result as unknown).toEqual([
      {
        id: 1,
        first_name: 'Abdelrahman',
        last_name: 'Ali',
      },
    ]);
  });
  it('show method to show the user', async () => {
    const result = await user.show(1);
    expect(result as unknown).toEqual({
      id: 1,
      first_name: 'Abdelrahman',
      last_name: 'Ali',
    });
  });
  it('update method to update the user', async () => {
    const result = await user.update({
      id: 1,
      first_name: 'Abdo',
      last_name: 'Ali',
      password: 'password123@@',
    });
    expect(result as unknown).toEqual({
      id: 1,
      first_name: 'Abdo',
      last_name: 'Ali',
    });
  });

  it('delete method to delete the user', async () => {
    await user.delete(1);
    const result = await user.index();
    expect(result).toEqual([]);
  });
});

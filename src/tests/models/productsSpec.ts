import { Product, ProductsModel } from '../../models/products';

const product = new ProductsModel();

describe('product Model Test', () => {
  it('should have an index method', () => {
    expect(product.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(product.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(product.create).toBeDefined();
  });
  it('should have a update method', () => {
    expect(product.update).toBeDefined();
  });
  it('A method that delete an order', () => {
    expect(product.delete).toBeDefined();
  });
});
it('test Product create method', async () => {
  const result = await product.create({
    name: 'hp430G',
    price: 1200,
  } as Product);
  expect(result).toEqual({
    id: 1,
    name: 'hp430G',
    price: 1200,
  });
});

it('show all products', async () => {
  const result = await product.index();
  expect(result).toEqual([
    {
      id: 1,
      name: 'hp430G',
      price: 1200,
    },
  ]);
});

it('show method to show the product ', async () => {
  const result = await product.show(1);
  expect(result).toEqual({
    id: 1,
    name: 'hp430G',
    price: 1200,
  });
});

it('update method to update the Product', async () => {
  const result = await product.update({
    id: 1,
    name: 'Dell G5',
    price: 1350,
  });

  expect(result).toEqual({
    id: 1,
    name: 'Dell G5',
    price: 1350,
  });
});

it('delete method to delete the Product', async () => {
  await product.delete(1);
  const result = await product.index();
  expect(result).toEqual([]);
});

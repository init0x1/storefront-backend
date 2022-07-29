import { Application, Request, Response } from 'express';
import { authorize } from '../middlewares/AuthenticationToken';
import { Order, OrdersModel } from '../models/orders';

const store = new OrdersModel();

const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const getOrders = await store.index();
    return res.send(getOrders);
  } catch (error) {
    res.status(401).json(error);
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const orderById = await store.show(+req.params.id);
    return res.json(orderById);
  } catch (error) {
    res.status(401).json(error);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
      id: undefined as unknown as number,
    };
    const newOrder = await store.create(order);
    return res.json(newOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await store.delete(req.body.id);
    return res.send(deletedOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;
    const updatedOrder = await store.update(id, status);
    return res.send(updatedOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const order_id: string = req.params.id;
  const product_id: string = req.body.product_id;
  const quantity: number = req.body.quantity;

  try {
    const ProductAdded = await store.addProduct(quantity, order_id, product_id);
    res.send(ProductAdded);
  } catch (error) {
    res.status(400).json(error);
  }
};

const ordersRoutes = (app: Application) => {
  app.get('/orders', authorize, getAllOrders);
  app.get('/orders/:id', authorize, getOrder);
  app.post('/orders', authorize, createOrder);
  app.delete('/orders', authorize, deleteOrder);
  app.put('/orders', authorize, updateOrder);
  app.post('/orders/:id/products', authorize, addProduct);
};
export default ordersRoutes;

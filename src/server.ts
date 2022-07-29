import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import usersRoutes from './handlers/users';
import productsRoutes from './handlers/products';
import ordersRoutes from './handlers/orders';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Application = express();

//Middlewares
app.use(helmet());
app.use(morgan('short'));
app.use(express.json());

app.get('/', async (_req: Request, res: Response) => {
  res.send('Welcom To My Storefront backend API');
});

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.listen(PORT, () => {
  console.log(`{+} Server started on Port :${PORT}`);
});

export default app;

import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
export const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
    return;
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized Access' });
  }
};

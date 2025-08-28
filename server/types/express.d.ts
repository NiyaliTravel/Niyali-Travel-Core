import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface AuthPayload extends JwtPayload {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
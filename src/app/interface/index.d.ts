import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Reauest {
      user: JwtPayload;
    }
  }
}

import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utills/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // if the token is sent form the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // if the token is valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        // err
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }

        const role = (decoded as JwtPayload).role;

        if (requiredRoles && !requiredRoles.includes(decoded?.role)) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }

        req.user = decoded as JwtPayload;
      },
    );

    next();
  });
};

export default auth;

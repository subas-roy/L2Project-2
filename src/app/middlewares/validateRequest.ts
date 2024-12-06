import { NextFunction, RequestHandler } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation check
      // if everything is alright next() ->
      await schema.parseAsync({
        body: req.body,
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;

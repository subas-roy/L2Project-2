/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  type TErrorSource = {
    path: string | number;
    meessage: string;
  }[];

  let errorSources: TErrorSource = [
    {
      path: '',
      meessage: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'ami zod error';
  }

  // ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    amiError: err,
  });
};

export default globalErrorHandler;

// pattern
/*
success
message
errorSources: [
  path: '',
  message: ''
]
stack
*/

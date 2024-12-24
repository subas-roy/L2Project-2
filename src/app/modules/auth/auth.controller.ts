import catchAsync from '../../utills/catchAsync';
import sendResponse from '../../utills/sendResponse';
import { AuthServices } from './auth.service';
import httpStatus from 'http-status';

const LoginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: result,
  });
});

export const AuthControllers = {
  LoginUser,
};

import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUseExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // // checking if the user is already deleted
  // const isDeleted = isUserExists.isDeleted;

  // if (isDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
  // }

  // // checking if the user is blocked
  // const userStatus = isUserExists.status;

  // if (userStatus === 'blocked') {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  // }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not matched!');
  }

  return {};
};

export const AuthServices = {
  loginUser,
};

import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const result = await Student.findOneAndUpdate({ id }, payload);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  // Transection and Rollback start
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletredStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletredStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild  to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild  to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletredStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }

  // Transection and rollback end
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};

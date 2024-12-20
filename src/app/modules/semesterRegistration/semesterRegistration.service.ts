import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import httpStatus from 'http-status';
import { semesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if semester is exist
  if (academicSemester) {
    const isAcademicSemesterExists =
      await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'This academic semester not found',
      );
    }
  }

  // check if semester is already registered!
  const isSemesterRegistrationExists = await semesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered!',
    );
  }

  const result = await semesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async () => {};

const getSingleSemesterRegistrationFromDB = async () => {};

const updateSemesterRegistrationIntoDB = async () => {};

export const semesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};

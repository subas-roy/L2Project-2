/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import httpStatus from 'http-status';
import EnrolledCourse from './enrolledCourse.model';
import { Student } from '../student/student.model';
import mongoose from 'mongoose';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /**
   * Step1: Check if the offered course is exists
   * Step2: Check if the student is already enrolled
   * Step3: Create and enrolled course
   */

  const { offeredCourse } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room is full !');
  }

  const student = await Student.findOne({ id: userId }).select('id');

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is already enrolled !');
  }

  // check total credits exceeds maxCredit
  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists.semesterRegistration,
  ).select('maxCredit');

  // total enrolled credits + new enrolled crouse credit > maxCredit
  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
  ]);

  console.log(enrolledCourses);

  // // Transaction
  // const session = await mongoose.startSession();

  // try {
  //   session.startTransaction();

  //   const result = await EnrolledCourse.create(
  //     [
  //       {
  //         semesterRegistration: isOfferedCourseExists.semesterRegistration,
  //         academicSemester: isOfferedCourseExists.academicSemester,
  //         academicFaculty: isOfferedCourseExists.academicFaculty,
  //         academicDepartment: isOfferedCourseExists.academicDepartment,
  //         offeredCourse: offeredCourse,
  //         course: isOfferedCourseExists.course,
  //         student: student._id,
  //         faculty: isOfferedCourseExists.faculty,
  //         isEnrolled: true,
  //       },
  //     ],
  //     { session },
  //   );

  //   if (!result) {
  //     throw new AppError(
  //       httpStatus.BAD_REQUEST,
  //       'Failed to enroll in this cousre !',
  //     );
  //   }

  //   const maxCapacity = isOfferedCourseExists.maxCapacity;
  //   await OfferedCourse.findByIdAndUpdate(offeredCourse, {
  //     maxCapacity: maxCapacity - 1,
  //   });

  //   await session.commitTransaction();
  //   await session.endSession();

  //   return result;
  // } catch (err: any) {
  //   await session.abortTransaction();
  //   await session.endSession();
  //   throw new Error(err);
  // }
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
};

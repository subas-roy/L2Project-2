import AppError from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { offeredCourse } from './offeredCourse.model';
import httpStatus from 'http-status';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;
  // check if the semester registration id is exists!
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found');
  }

  const isAcademicDeaprtmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDeaprtmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found');
  }

  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const isDepartmentBelongToFaculty = await AcademicDepartment.findById({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDeaprtmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`,
    );
  }

  // check if the same offered course same section in same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await offeredCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exists`,
    );
  }

  // get the schedules of the faulties
  const assignedSchedules = await offeredCourse
    .find({
      semesterRegistration,
      faculty,
      days: { $in: days },
    })
    .select('days startTime endTime');

  console.log(assignedSchedules);

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  assignedSchedules.forEach((schedule) => {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      throw new AppError(
        httpStatus.CONFLICT,
        `This faculty is not available at this time! Choose other time or day`,
      );
    }
  });

  const result = await offeredCourse.create({ ...payload, academicSemester });
  return result;
  // return null;
};

// const getAllSemesterRegistrationFromDB = async (
//   query: Record<string, unknown>,
// ) => {
//   const semesterRegistrationQuery = new QueryBuilder(
//     semesterRegistration.find().populate('academicSemester'),
//     query,
//   )
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await semesterRegistrationQuery.modelQuery;

//   return result;
// };

// const getSingleSemesterRegistrationFromDB = async (id: string) => {
//   const result = semesterRegistration.findById(id);

//   return result;
// };

// const updateSemesterRegistrationIntoDB = async (
//   id: string,
//   payload: Partial<TSemesterRegistration>,
// ) => {
//   // check if requested registered semester is exists!
//   const isSemesterRegistrationExists = await semesterRegistration.findById(id);

//   if (!isSemesterRegistrationExists) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found');
//   }

//   // if the requested semester registration is ended, we will not update anything
//   const currentSemesterStatus = isSemesterRegistrationExists?.status;
//   const requestedStatus = payload?.status;

//   if (currentSemesterStatus === RegistrationStatus.ENDED) {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       `This semester is already ${currentSemesterStatus}`,
//     );
//   }

//   // UPCOMING --> ONGOING --> ENDED
//   if (
//     currentSemesterStatus === RegistrationStatus.UPCOMING &&
//     requestedStatus === RegistrationStatus.ENDED
//   ) {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
//     );
//   }

//   if (
//     currentSemesterStatus === RegistrationStatus.ONGOING &&
//     requestedStatus === RegistrationStatus.UPCOMING
//   ) {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
//     );
//   }

//   const result = await semesterRegistration.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//   });

//   return result;
// };

export const offeredCourseService = {
  createOfferedCourseIntoDB,
  // getAllSemesterRegistrationFromDB,
  // getSingleSemesterRegistrationFromDB,
  // updateSemesterRegistrationIntoDB,
};

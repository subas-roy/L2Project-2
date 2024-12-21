import { Request, Response } from 'express';
import catchAsync from '../../utills/catchAsync';
import sendResponse from '../../utills/sendResponse';
import httpStatus from 'http-status';
import { offeredCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseService.createOfferedCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is created succesfully',
    data: result,
  });
});

// const getAllSemesterRegistration = catchAsync(
//   async (req: Request, res: Response) => {
//     const result =
//       await semesterRegistrationService.getAllSemesterRegistrationFromDB(
//         req.query,
//       );

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Semester Registrations are retrieved succesfully',
//       data: result,
//     });
//   },
// );

// const getSingleSemesterRegistration = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result =
//       await semesterRegistrationService.getSingleSemesterRegistrationFromDB(id);

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Semester Registration is retrieved succesfully',
//       data: result,
//     });
//   },
// );

// const updateSemesterRegistration = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result =
//       await semesterRegistrationService.updateSemesterRegistrationIntoDB(
//         id,
//         req.body,
//       );

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Semester Registration updated succesfully',
//       data: result,
//     });
//   },
// );

export const offeredcourseController = {
  createOfferedCourse,
  // updateSemesterRegistration,
  // getAllSemesterRegistration,
  // getSingleSemesterRegistration,
};

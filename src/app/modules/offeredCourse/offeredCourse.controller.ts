import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { OfferedCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
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

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course updated succesfully',
    data: result,
  });
});

export const offeredcourseController = {
  createOfferedCourse,
  updateOfferedCourse,
  // getAllSemesterRegistration,
  // getSingleSemesterRegistration,
};

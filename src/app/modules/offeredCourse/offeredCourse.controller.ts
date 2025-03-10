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

const getAllOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered courses are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const getMyOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  // console.log(userId);
  const result = await OfferedCourseServices.getMyOfferedCoursesFromDB(
    userId,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered courses retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    // console.log(id);
    const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course is retrieved succesfully',
      data: result,
    });
  },
);

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

export const OfferedcourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  getMyOfferedCourses,
};

import { Request, Response } from 'express';
import catchAsync from '../../utills/catchAsync';
import sendResponse from '../../utills/sendResponse';
import { semesterRegistrationService } from './semesterRegistration.service';
import httpStatus from 'http-status';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is created succesfully',
      data: result,
    });
  },
);

const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationService.getAllSemesterRegistrationFromDB(
        req.query,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registrations are retrieved succesfully',
      data: result,
    });
  },
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await semesterRegistrationService.getSingleSemesterRegistrationFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is retrieved succesfully',
      data: result,
    });
  },
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await semesterRegistrationService.updateSemesterRegistrationIntoDB(
        id,
        req.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration updated succesfully',
      data: result,
    });
  },
);

export const semesterRegistrationController = {
  createSemesterRegistration,
  updateSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
};

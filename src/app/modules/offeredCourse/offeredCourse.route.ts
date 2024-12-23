import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { offeredcourseController } from './offeredCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  offeredcourseController.createOfferedCourse,
);

// router.get(
//   '/:id',
//   offeredcourseController.getSingleSemesterRegistration,
// );

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  offeredcourseController.updateOfferedCourse,
);

// router.get('/', offeredcourseController.getAllSemesterRegistration);

export const offeredCourseRoutes = router;

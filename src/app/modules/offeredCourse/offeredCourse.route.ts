import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedcourseControllers } from './offeredCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedcourseControllers.createOfferedCourse,
);

router.get('/:id', OfferedcourseControllers.getSingleOfferedCourse);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedcourseControllers.updateOfferedCourse,
);

router.get('/', OfferedcourseControllers.getAllOfferedCourse);

export const OfferedCourseRoutes = router;

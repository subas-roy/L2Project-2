import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/:id', CourseControllers.getSingleCourse);

router.delete('/:id', CourseControllers.deleteCourse);

router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationScema),
  CourseControllers.updateCourse,
);

router.put(
  '/:courseId/asign-faculties',
  CourseControllers.assignFacultiesWithCourse,
);

router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;

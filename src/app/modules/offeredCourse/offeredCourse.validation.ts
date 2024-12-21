import z from 'zod';
import { Days } from './offeredCourse.constant';

const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

const updateOfferedCourseValidationSchema = z.object({
  boby: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    days: z.enum([...Days] as [string, ...string[]]).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};

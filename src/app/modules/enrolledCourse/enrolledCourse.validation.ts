import z from 'zod';

const createEnrolledCourseValidationZodSchema = z.object({
  body: z.object({
    offeredCourese: z.string(),
  }),
});

export const EnrolledCourseValidations = {
  createEnrolledCourseValidationZodSchema,
};

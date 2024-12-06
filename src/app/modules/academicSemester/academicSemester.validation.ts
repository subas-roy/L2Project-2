import { z } from 'zod';

const createAcademicSemesterValidationSchema = z.object({
  body: {
    name: z.enum,
  },
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
};

import Joi from 'joi';

// creating schema validation using Joi
// User Name Schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .required()
    .trim()
    .regex(/^[A-Z][a-z]*$/, 'capitalize format') // Ensure first letter is capitalized
    .messages({
      'string.pattern.base': 'First name must start with an uppercase letter',
    }),
  middleName: Joi.string().max(20).optional().trim(),
  lastName: Joi.string()
    .required()
    .trim()
    .regex(/^[A-Za-z]+$/, 'alpha characters only') // Ensure alpha characters
    .messages({
      'string.pattern.base': 'Last name must contain only alphabets',
    }),
});

// Guardian Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().trim(),
  fatherOccupation: Joi.string().required().trim(),
  fatherContactNo: Joi.string().required().trim(),
  motherName: Joi.string().required().trim(),
  motherOccupation: Joi.string().required().trim(),
  motherContactNo: Joi.string().required().trim(),
});

// Local Guardian Schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  occupation: Joi.string().required().trim(),
  contactNo: Joi.string().required().trim(),
  address: Joi.string().required().trim(),
});

// Main Student Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required(), // Unique ID
  name: userNameValidationSchema.required(), // Nested name object
  gender: Joi.string()
    .required()
    .valid('male', 'female', 'other')
    .messages({ 'any.only': '{#value} is not a valid gender' }),
  dateOfBirth: Joi.string().required(), // Consider date validation if needed
  email: Joi.string()
    .required()
    .email()
    .messages({ 'string.email': '{#value} is not a valid email address' }),
  contactNo: Joi.string().required().trim(),
  emergencyContactNo: Joi.string().required().trim(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(), // Nested guardian object
  localGuardian: localGuardianValidationSchema.required(), // Nested local guardian object
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;

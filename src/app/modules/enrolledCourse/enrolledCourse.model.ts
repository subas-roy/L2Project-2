import mongoose, { Schema } from 'mongoose';
import { TCourseMarks, TEnrolledCourse } from './enrolledCourse.interface';
import { Grade } from './enrolledCourse.constant';

const courseMarksSchema = new Schema<TCourseMarks>({
  classTest1: {
    type: Number,
    default: 0,
  },
  midTerm: {
    type: Number,
    default: 0,
  },
  classTest2: {
    type: Number,
    default: 0,
  },
  finalTerm: {
    type: Number,
    default: 0,
  },
});

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'semesterRegistration',
    required: true,
  },

  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'academicDepartment',
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'academicFaculty',
    required: true,
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    ref: 'offeredCourse',
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'student',
    required: true,
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: 'faculty',
    required: true,
  },
  isEnrolled: {
    type: Boolean,
    default: false,
  },
  courseMarks: {
    type: courseMarksSchema,
  },
  grade: {
    type: String,
    enum: Grade,
    default: 'NA',
  },
  gradePoints: {
    type: Number,
    min: 0,
    max: 4,
    default: 0,
  },
  isConpleted: {
    type: Boolean,
    default: false,
  },
});

const EnrolledCourse = mongoose.model<TEnrolledCourse>(
  'EnrolledCourse',
  enrolledCourseSchema,
);

export default EnrolledCourse;

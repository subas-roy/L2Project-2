import {
  TAcademicSemesterCode,
  TAcademicSemesterCodeMapper,
  TAcademicSemesterName,
  TMonths,
} from './academicSemester.interface';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summar',
  'Fall',
];

export const academicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

export const academicSemesterNameCodeMapper: TAcademicSemesterCodeMapper = {
  Autumn: '01',
  Summar: '02',
  Fall: '02',
};

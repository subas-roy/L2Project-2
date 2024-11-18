import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactno: string;
  motherName: string;
  motherOccupation: string;
  motherContactno: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type localGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: localGuardian;
  profileImg?: string;
  isActive: 'active' | 'inActive';
};

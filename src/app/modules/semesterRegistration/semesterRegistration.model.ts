import mongoose from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";

export const semesterRegistrationSchema = new mongoose.Schema.<TSemesterRegistration>(
  {}
)

export const semesterRegistration = mongoose.model<TSemesterRegistration>('SemesterRegistration', semesterRegistrationSchema);

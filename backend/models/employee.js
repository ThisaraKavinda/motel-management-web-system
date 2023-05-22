import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  dob: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
  },
  nic: {
    type: String,
  },
  contact: {
    type: String,
  },
  password: {
    type: String,
  },
  Type: {
    type: String,
  },
  leaveTaken: {
    type:Number,
  },
  salary: {
    type:Number,
  },
});

export const EmployeeModel = mongoose.model('employees', EmployeeSchema);
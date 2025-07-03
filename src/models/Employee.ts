import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  benefits: { type: string; value: number }[];
  leaveBalance: number;
  active: boolean;
  hireDate: Date;
  terminationDate?: Date;
}

const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  benefits: [{
    type: { type: String, required: true },
    value: { type: Number, required: true }
  }],
  leaveBalance: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  hireDate: { type: Date, required: true },
  terminationDate: { type: Date },
});

export default mongoose.model<IEmployee>('Employee', EmployeeSchema); 
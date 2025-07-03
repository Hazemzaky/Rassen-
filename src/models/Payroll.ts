import mongoose, { Document, Schema } from 'mongoose';

export interface IPayroll extends Document {
  employee: mongoose.Types.ObjectId;
  period: string;
  baseSalary: number;
  benefits: number;
  leaveCost: number;
  reimbursements: number;
  deductions: number;
  netPay: number;
  status: 'pending' | 'processed' | 'paid';
  runDate: Date;
  project?: mongoose.Types.ObjectId;
}

const PayrollSchema: Schema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  period: { type: String, required: true },
  baseSalary: { type: Number, required: true },
  benefits: { type: Number, default: 0 },
  leaveCost: { type: Number, default: 0 },
  reimbursements: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netPay: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processed', 'paid'], default: 'pending' },
  runDate: { type: Date, default: Date.now },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
});

export default mongoose.model<IPayroll>('Payroll', PayrollSchema); 
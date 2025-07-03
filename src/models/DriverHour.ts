import mongoose, { Document, Schema } from 'mongoose';

export interface IDriverHour extends Document {
  employee: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
  date: Date;
  hours: number;
  cost: number;
}

const DriverHourSchema = new Schema<IDriverHour>({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  date: { type: Date, required: true },
  hours: { type: Number, required: true },
  cost: { type: Number, required: true },
});

export default mongoose.model<IDriverHour>('DriverHour', DriverHourSchema); 
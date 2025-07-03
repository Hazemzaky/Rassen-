import mongoose, { Document, Schema } from 'mongoose';

export interface IFuelLog extends Document {
  date: Date;
  vehicle?: string;
  driver?: mongoose.Types.ObjectId;
  liters: number;
  cost: number;
  project?: mongoose.Types.ObjectId;
}

const FuelLogSchema = new Schema<IFuelLog>({
  date: { type: Date, required: true },
  vehicle: { type: String },
  driver: { type: Schema.Types.ObjectId, ref: 'Employee' },
  liters: { type: Number, required: true },
  cost: { type: Number, required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
});

export default mongoose.model<IFuelLog>('FuelLog', FuelLogSchema); 
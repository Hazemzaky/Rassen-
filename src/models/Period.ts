import mongoose, { Document, Schema } from 'mongoose';

export interface IPeriod extends Document {
  period: string;
  closed: boolean;
  closedAt?: Date;
  closedBy?: string;
}

const PeriodSchema: Schema = new Schema({
  period: { type: String, required: true, unique: true },
  closed: { type: Boolean, default: false },
  closedAt: { type: Date },
  closedBy: { type: String },
});

export default mongoose.model<IPeriod>('Period', PeriodSchema);

export async function isPeriodClosed(period: string): Promise<boolean> {
  const p = await mongoose.model<IPeriod>('Period').findOne({ period });
  return !!(p && p.closed);
} 
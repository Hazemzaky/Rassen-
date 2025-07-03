import mongoose, { Document, Schema } from 'mongoose';

export interface IDepreciation extends Document {
  asset: mongoose.Types.ObjectId;
  date: Date;
  amount: number;
  method: string;
  notes?: string;
}

const DepreciationSchema = new Schema<IDepreciation>({
  asset: { type: Schema.Types.ObjectId, ref: 'Asset', required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  notes: { type: String },
});

export default mongoose.model<IDepreciation>('Depreciation', DepreciationSchema); 
import mongoose, { Document, Schema } from 'mongoose';

export interface IAsset extends Document {
  name: string;
  type: string; // e.g., 'vehicle', 'equipment'
  purchaseDate: Date;
  purchaseValue: number;
  depreciationMethod: 'straight-line' | 'declining-balance';
  usefulLife: number; // in years
  salvageValue: number;
  currentValue: number;
  status: 'active' | 'in_maintenance' | 'retired' | 'disposed';
  notes?: string;
}

const AssetSchema = new Schema<IAsset>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  purchaseValue: { type: Number, required: true },
  depreciationMethod: { type: String, enum: ['straight-line', 'declining-balance'], default: 'straight-line' },
  usefulLife: { type: Number, required: true },
  salvageValue: { type: Number, default: 0 },
  currentValue: { type: Number, required: true },
  status: { type: String, enum: ['active', 'in_maintenance', 'retired', 'disposed'], default: 'active' },
  notes: { type: String },
});

export default mongoose.model<IAsset>('Asset', AssetSchema); 
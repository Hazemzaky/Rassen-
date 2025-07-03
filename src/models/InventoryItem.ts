import mongoose, { Document, Schema } from 'mongoose';

export interface IInventoryItem extends Document {
  name: string;
  type: 'spare' | 'tool' | 'consumable';
  sku?: string;
  quantity: number;
  unit: string;
  location?: string;
  minStock?: number;
  maxStock?: number;
  cost?: number;
  supplier?: string;
  status: 'active' | 'inactive';
  notes?: string;
}

const InventoryItemSchema = new Schema<IInventoryItem>({
  name: { type: String, required: true },
  type: { type: String, enum: ['spare', 'tool', 'consumable'], required: true },
  sku: { type: String },
  quantity: { type: Number, required: true, default: 0 },
  unit: { type: String, required: true },
  location: { type: String },
  minStock: { type: Number, default: 0 },
  maxStock: { type: Number },
  cost: { type: Number },
  supplier: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  notes: { type: String },
});

export default mongoose.model<IInventoryItem>('InventoryItem', InventoryItemSchema); 
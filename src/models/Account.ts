import mongoose, { Document, Schema } from 'mongoose';

export interface IAccount extends Document {
  name: string;
  code: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  parent?: mongoose.Types.ObjectId;
  description?: string;
  active: boolean;
}

const AccountSchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['asset', 'liability', 'equity', 'revenue', 'expense'], required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Account' },
  description: { type: String },
  active: { type: Boolean, default: true },
});

export default mongoose.model<IAccount>('Account', AccountSchema); 
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  phone?: string;
  workEmail?: string;
  address?: string;
  position?: string;
  lastSignIn?: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'accountant', 'user'], default: 'user' },
  phone: { type: String },
  workEmail: { type: String },
  address: { type: String },
  position: { type: String },
  lastSignIn: { type: Date },
});

export default mongoose.model<IUser>('User', UserSchema); 
import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  name: string;
  customer?: string;
  startDate?: Date;
  endDate?: Date;
  status?: 'active' | 'completed' | 'cancelled';
  description?: string;
  revenue?: number;
  notes?: string;
}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  customer: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
  description: { type: String },
  revenue: { type: Number },
  notes: { type: String },
});

export default mongoose.model<IProject>('Project', ProjectSchema); 
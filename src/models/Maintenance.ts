import mongoose, { Document, Schema } from 'mongoose';

export interface IMaintenance extends Document {
  asset: mongoose.Types.ObjectId;
  type: 'preventive' | 'corrective';
  description: string;
  scheduledDate: Date;
  completedDate?: Date;
  cost?: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  downtimeHours?: number;
  notes?: string;
}

const MaintenanceSchema = new Schema<IMaintenance>({
  asset: { type: Schema.Types.ObjectId, ref: 'Asset', required: true },
  type: { type: String, enum: ['preventive', 'corrective'], required: true },
  description: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  completedDate: { type: Date },
  cost: { type: Number },
  status: { type: String, enum: ['scheduled', 'in_progress', 'completed', 'cancelled'], default: 'scheduled' },
  downtimeHours: { type: Number },
  notes: { type: String },
});

export default mongoose.model<IMaintenance>('Maintenance', MaintenanceSchema); 
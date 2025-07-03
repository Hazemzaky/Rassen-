import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import expenseRoutes from './routes/expenseRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import budgetRoutes from './routes/budgetRoutes';
import accountRoutes from './routes/accountRoutes';
import journalEntryRoutes from './routes/journalEntryRoutes';
import periodRoutes from './routes/periodRoutes';
import projectRoutes from './routes/projectRoutes';
import fuelLogRoutes from './routes/fuelLogRoutes';
import driverHourRoutes from './routes/driverHourRoutes';
import assetRoutes from './routes/assetRoutes';
import maintenanceRoutes from './routes/maintenanceRoutes';
import depreciationRoutes from './routes/depreciationRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import employeeRoutes from './routes/employeeRoutes';
import payrollRoutes from './routes/payrollRoutes';
import reimbursementRoutes from './routes/reimbursementRoutes';
import leaveRoutes from './routes/leaveRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/financedb';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req: Request, res: Response) => {
  res.send('Financial Management API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/journal-entries', journalEntryRoutes);
app.use('/api/periods', periodRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/fuel-logs', fuelLogRoutes);
app.use('/api/driver-hours', driverHourRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/depreciation', depreciationRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/reimbursements', reimbursementRoutes);
app.use('/api/leave', leaveRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
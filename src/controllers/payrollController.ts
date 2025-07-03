import { Request, Response } from 'express';
import Payroll from '../models/Payroll';
import Employee from '../models/Employee';
import { isPeriodClosed } from '../models/Period';

export const createPayroll = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employee, period, baseSalary, benefits, leaveCost, reimbursements, deductions, netPay, status } = req.body;
    if (!employee || !period || !baseSalary || !netPay) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    if (period && await isPeriodClosed(period)) {
      res.status(403).json({ message: 'This period is locked and cannot be edited.' });
      return;
    }
    const payroll = new Payroll({ employee, period, baseSalary, benefits, leaveCost, reimbursements, deductions, netPay, status });
    await payroll.save();
    res.status(201).json(payroll);
  } catch (error) {
    console.error('Error in createPayroll:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getPayrolls = async (req: Request, res: Response): Promise<void> => {
  try {
    const payrolls = await Payroll.find().populate('employee');
    res.json(payrolls);
  } catch (error) {
    console.error('Error in getPayrolls:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getPayroll = async (req: Request, res: Response): Promise<void> => {
  try {
    const payroll = await Payroll.findById(req.params.id).populate('employee');
    if (!payroll) {
      res.status(404).json({ message: 'Payroll not found' });
      return;
    }
    res.json(payroll);
  } catch (error) {
    console.error('Error in getPayroll:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updatePayroll = async (req: Request, res: Response): Promise<void> => {
  try {
    const { period } = req.body;
    if (period && await isPeriodClosed(period)) {
      res.status(403).json({ message: 'This period is locked and cannot be edited.' });
      return;
    }
    const payroll = await Payroll.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payroll) {
      res.status(404).json({ message: 'Payroll not found' });
      return;
    }
    res.json(payroll);
  } catch (error) {
    console.error('Error in updatePayroll:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const processPayroll = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const payroll = await Payroll.findById(id);
    if (!payroll) {
      res.status(404).json({ message: 'Payroll not found' });
      return;
    }
    payroll.status = 'processed';
    await payroll.save();
    res.json(payroll);
  } catch (error) {
    console.error('Error in processPayroll:', error);
    res.status(500).json({ message: 'Server error', error });
  }
}; 
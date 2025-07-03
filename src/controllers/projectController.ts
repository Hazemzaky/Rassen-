import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project';
import Expense from '../models/Expense';
import Payroll from '../models/Payroll';
import FuelLog from '../models/FuelLog';
import DriverHour from '../models/DriverHour';

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getProjectProfitability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Revenue: sum of all income (category: 'income') assigned to this project
    const revenueAgg = await Expense.aggregate([
      { $match: { project: new mongoose.Types.ObjectId(id), category: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const revenue = revenueAgg[0]?.total || 0;
    // Costs: sum of all expenses, payroll, fuel logs, driver hours assigned to this project
    const expenseAgg = await Expense.aggregate([
      { $match: { project: new mongoose.Types.ObjectId(id), category: { $ne: 'income' } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const expenses = expenseAgg[0]?.total || 0;
    const payrollAgg = await Payroll.aggregate([
      { $match: { project: new mongoose.Types.ObjectId(id) } },
      { $group: { _id: null, total: { $sum: '$netPay' } } }
    ]);
    const payroll = payrollAgg[0]?.total || 0;
    const fuelAgg = await FuelLog.aggregate([
      { $match: { project: new mongoose.Types.ObjectId(id) } },
      { $group: { _id: null, total: { $sum: '$cost' } } }
    ]);
    const fuel = fuelAgg[0]?.total || 0;
    const driverHourAgg = await DriverHour.aggregate([
      { $match: { project: new mongoose.Types.ObjectId(id) } },
      { $group: { _id: null, total: { $sum: '$cost' } } }
    ]);
    const driverHours = driverHourAgg[0]?.total || 0;
    const totalCost = expenses + payroll + fuel + driverHours;
    const profit = revenue - totalCost;
    res.json({ revenue, expenses, payroll, fuel, driverHours, totalCost, profit });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 
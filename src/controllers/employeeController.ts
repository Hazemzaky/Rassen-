import { Request, Response } from 'express';
import Employee from '../models/Employee';

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, position, department, salary, benefits, leaveBalance, hireDate } = req.body;
    // Validate benefits
    const validBenefits = Array.isArray(benefits)
      ? benefits.filter((b: any) => b && typeof b.type === 'string' && typeof b.value === 'number')
      : [];
    const employee = new Employee({ name, email, position, department, salary, benefits: validBenefits, leaveBalance, hireDate });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { benefits, ...rest } = req.body;
    const validBenefits = Array.isArray(benefits)
      ? benefits.filter((b: any) => b && typeof b.type === 'string' && typeof b.value === 'number')
      : [];
    const employee = await Employee.findByIdAndUpdate(req.params.id, { ...rest, benefits: validBenefits }, { new: true });
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deactivateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, { active: false, terminationDate: new Date() }, { new: true });
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    res.json({ message: 'Employee deactivated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 
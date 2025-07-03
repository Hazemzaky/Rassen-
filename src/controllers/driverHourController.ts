import { Request, Response } from 'express';
import DriverHour from '../models/DriverHour';

export const createDriverHour = async (req: Request, res: Response) => {
  try {
    const driverHour = new DriverHour(req.body);
    await driverHour.save();
    res.status(201).json(driverHour);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getDriverHours = async (req: Request, res: Response) => {
  try {
    const filter: any = {};
    if (req.query.project) filter.project = req.query.project;
    const driverHours = await DriverHour.find(filter).populate('employee').populate('project');
    res.json(driverHours);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getDriverHour = async (req: Request, res: Response) => {
  try {
    const driverHour = await DriverHour.findById(req.params.id).populate('employee').populate('project');
    if (!driverHour) {
      res.status(404).json({ message: 'Driver hour not found' });
      return;
    }
    res.json(driverHour);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateDriverHour = async (req: Request, res: Response) => {
  try {
    const driverHour = await DriverHour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!driverHour) {
      res.status(404).json({ message: 'Driver hour not found' });
      return;
    }
    res.json(driverHour);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteDriverHour = async (req: Request, res: Response) => {
  try {
    const driverHour = await DriverHour.findByIdAndDelete(req.params.id);
    if (!driverHour) {
      res.status(404).json({ message: 'Driver hour not found' });
      return;
    }
    res.json({ message: 'Driver hour deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 
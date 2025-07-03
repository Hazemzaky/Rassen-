import { Request, Response } from 'express';
import FuelLog from '../models/FuelLog';

export const createFuelLog = async (req: Request, res: Response) => {
  try {
    const fuelLog = new FuelLog(req.body);
    await fuelLog.save();
    res.status(201).json(fuelLog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getFuelLogs = async (req: Request, res: Response) => {
  try {
    const filter: any = {};
    if (req.query.project) filter.project = req.query.project;
    const fuelLogs = await FuelLog.find(filter).populate('driver').populate('project');
    res.json(fuelLogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getFuelLog = async (req: Request, res: Response) => {
  try {
    const fuelLog = await FuelLog.findById(req.params.id).populate('driver').populate('project');
    if (!fuelLog) {
      res.status(404).json({ message: 'Fuel log not found' });
      return;
    }
    res.json(fuelLog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateFuelLog = async (req: Request, res: Response) => {
  try {
    const fuelLog = await FuelLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fuelLog) {
      res.status(404).json({ message: 'Fuel log not found' });
      return;
    }
    res.json(fuelLog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteFuelLog = async (req: Request, res: Response) => {
  try {
    const fuelLog = await FuelLog.findByIdAndDelete(req.params.id);
    if (!fuelLog) {
      res.status(404).json({ message: 'Fuel log not found' });
      return;
    }
    res.json({ message: 'Fuel log deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 
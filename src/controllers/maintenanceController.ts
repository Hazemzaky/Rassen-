import { Request, Response } from 'express';
import Maintenance from '../models/Maintenance';

export const createMaintenance = async (req: Request, res: Response) => {
  try {
    const maintenance = new Maintenance(req.body);
    await maintenance.save();
    res.status(201).json(maintenance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getMaintenances = async (req: Request, res: Response) => {
  try {
    const maintenances = await Maintenance.find().populate('asset');
    res.json(maintenances);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getMaintenance = async (req: Request, res: Response) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id).populate('asset');
    if (!maintenance) {
      res.status(404).json({ message: 'Maintenance not found' });
      return;
    }
    res.json(maintenance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateMaintenance = async (req: Request, res: Response) => {
  try {
    const maintenance = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!maintenance) {
      res.status(404).json({ message: 'Maintenance not found' });
      return;
    }
    res.json(maintenance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteMaintenance = async (req: Request, res: Response) => {
  try {
    const maintenance = await Maintenance.findByIdAndDelete(req.params.id);
    if (!maintenance) {
      res.status(404).json({ message: 'Maintenance not found' });
      return;
    }
    res.json({ message: 'Maintenance deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const completeMaintenance = async (req: Request, res: Response) => {
  // Skeleton: implement completion logic here
  res.json({ message: 'Maintenance completion not implemented yet.' });
};

export const trackDowntime = async (req: Request, res: Response) => {
  // Skeleton: implement downtime tracking logic here
  res.json({ message: 'Downtime tracking not implemented yet.' });
}; 
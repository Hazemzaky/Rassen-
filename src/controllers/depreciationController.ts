import { Request, Response } from 'express';
import Depreciation from '../models/Depreciation';

export const createDepreciation = async (req: Request, res: Response) => {
  try {
    const depreciation = new Depreciation(req.body);
    await depreciation.save();
    res.status(201).json(depreciation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getDepreciations = async (req: Request, res: Response) => {
  try {
    const depreciations = await Depreciation.find().populate('asset');
    res.json(depreciations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getDepreciation = async (req: Request, res: Response) => {
  try {
    const depreciation = await Depreciation.findById(req.params.id).populate('asset');
    if (!depreciation) {
      res.status(404).json({ message: 'Depreciation not found' });
      return;
    }
    res.json(depreciation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateDepreciation = async (req: Request, res: Response) => {
  try {
    const depreciation = await Depreciation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!depreciation) {
      res.status(404).json({ message: 'Depreciation not found' });
      return;
    }
    res.json(depreciation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteDepreciation = async (req: Request, res: Response) => {
  try {
    const depreciation = await Depreciation.findByIdAndDelete(req.params.id);
    if (!depreciation) {
      res.status(404).json({ message: 'Depreciation not found' });
      return;
    }
    res.json({ message: 'Depreciation deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 
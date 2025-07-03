import { Request, Response } from 'express';
import Period from '../models/Period';

export const closePeriod = async (req: Request, res: Response): Promise<void> => {
  try {
    const { period, closedBy } = req.body;
    let p = await Period.findOne({ period });
    if (!p) {
      p = new Period({ period });
    }
    p.closed = true;
    p.closedAt = new Date();
    p.closedBy = closedBy || 'system';
    await p.save();
    res.json(p);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getPeriods = async (req: Request, res: Response): Promise<void> => {
  try {
    const periods = await Period.find();
    res.json(periods);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 
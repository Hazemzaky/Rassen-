import { Request, Response } from 'express';
import Asset from '../models/Asset';

export const createAsset = async (req: Request, res: Response) => {
  try {
    const asset = new Asset(req.body);
    await asset.save();
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAssets = async (req: Request, res: Response) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAsset = async (req: Request, res: Response) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      res.status(404).json({ message: 'Asset not found' });
      return;
    }
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateAsset = async (req: Request, res: Response) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!asset) {
      res.status(404).json({ message: 'Asset not found' });
      return;
    }
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteAsset = async (req: Request, res: Response) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) {
      res.status(404).json({ message: 'Asset not found' });
      return;
    }
    res.json({ message: 'Asset deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const changeAssetStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const asset = await Asset.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!asset) {
      res.status(404).json({ message: 'Asset not found' });
      return;
    }
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const calculateDepreciation = async (req: Request, res: Response) => {
  // Skeleton: implement depreciation calculation logic here
  res.json({ message: 'Depreciation calculation not implemented yet.' });
}; 
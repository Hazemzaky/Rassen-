import { Request, Response } from 'express';
import InventoryItem from '../models/InventoryItem';
import InventoryTransaction from '../models/InventoryTransaction';

export function createItem(req: Request, res: Response) {
  (async () => {
    try {
      const item = new InventoryItem(req.body);
      await item.save();
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  })();
}

export function getItems(req: Request, res: Response) {
  (async () => {
    try {
      const items = await InventoryItem.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  })();
}

export function getItem(req: Request, res: Response) {
  (async () => {
    try {
      const item = await InventoryItem.findById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  })();
}

export function updateItem(req: Request, res: Response) {
  (async () => {
    try {
      const item = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  })();
}

export function deleteItem(req: Request, res: Response) {
  (async () => {
    try {
      const item = await InventoryItem.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json({ message: 'Item deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  })();
}

export function createTransaction(req: Request, res: Response) {
  (async () => {
    try {
      const { item, type, quantity, ...rest } = req.body;
      const inventoryItem = await InventoryItem.findById(item);
      if (!inventoryItem) return res.status(404).json({ message: 'Item not found' });
      let newQty = inventoryItem.quantity;
      if (type === 'inbound') newQty += quantity;
      else if (type === 'outbound') newQty -= quantity;
      else if (type === 'adjustment') newQty = quantity;
      if (newQty < 0) return res.status(400).json({ message: 'Insufficient stock' });
      inventoryItem.quantity = newQty;
      await inventoryItem.save();
      const transaction = new InventoryTransaction({ item, type, quantity, ...rest });
      await transaction.save();
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  })();
}

export function getTransactions(req: Request, res: Response) {
  (async () => {
    try {
      const filter: any = {};
      if (req.query.item) filter.item = req.query.item;
      if (req.query.type) filter.type = req.query.type;
      const txns = await InventoryTransaction.find(filter).populate('item').populate('relatedAsset').populate('relatedMaintenance').populate('user');
      res.json(txns);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  })();
}

export function getItemTransactions(req: Request, res: Response) {
  (async () => {
    try {
      const txns = await InventoryTransaction.find({ item: req.params.id }).populate('item').populate('relatedAsset').populate('relatedMaintenance').populate('user');
      res.json(txns);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  })();
} 
import { Router } from 'express';
import * as inventoryController from '../controllers/inventoryController';

const router = Router();

// Inventory Items
router.post('/items', inventoryController.createItem);
router.get('/items', inventoryController.getItems);
router.get('/items/:id', inventoryController.getItem);
router.put('/items/:id', inventoryController.updateItem);
router.delete('/items/:id', inventoryController.deleteItem);

// Inventory Transactions
router.post('/transactions', inventoryController.createTransaction);
router.get('/transactions', inventoryController.getTransactions);
router.get('/items/:id/transactions', inventoryController.getItemTransactions);

export default router; 
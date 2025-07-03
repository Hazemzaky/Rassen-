import { Router } from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth';
import {
  createExpense, getExpenses, getExpense, updateExpense, deleteExpense,
  createIncome, getIncome
} from '../controllers/expenseController';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', authenticate, upload.single('proof'), createExpense);
router.get('/', authenticate, getExpenses);
router.get('/:id', authenticate, getExpense);
router.put('/:id', authenticate, updateExpense);
router.delete('/:id', authenticate, deleteExpense);

router.post('/income', authenticate, createIncome);
router.get('/income', authenticate, getIncome);

export default router; 
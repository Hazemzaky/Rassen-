import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createPayroll, getPayrolls, getPayroll, updatePayroll, processPayroll
} from '../controllers/payrollController';

const router = Router();

router.post('/', authenticate, createPayroll);
router.get('/', authenticate, getPayrolls);
router.get('/:id', authenticate, getPayroll);
router.put('/:id', authenticate, updatePayroll);
router.post('/:id/process', authenticate, processPayroll);

export default router; 
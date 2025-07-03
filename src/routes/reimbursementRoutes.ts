import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createReimbursement, getReimbursements, getReimbursement, updateReimbursement, approveReimbursement, rejectReimbursement
} from '../controllers/reimbursementController';

const router = Router();

router.post('/', authenticate, createReimbursement);
router.get('/', authenticate, getReimbursements);
router.get('/:id', authenticate, getReimbursement);
router.put('/:id', authenticate, updateReimbursement);
router.post('/:id/approve', authenticate, approveReimbursement);
router.post('/:id/reject', authenticate, rejectReimbursement);

export default router; 
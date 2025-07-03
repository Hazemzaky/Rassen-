import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createLeave, getLeaves, getLeave, updateLeave, approveLeave, rejectLeave
} from '../controllers/leaveController';

const router = Router();

router.post('/', authenticate, createLeave);
router.get('/', authenticate, getLeaves);
router.get('/:id', authenticate, getLeave);
router.put('/:id', authenticate, updateLeave);
router.post('/:id/approve', authenticate, approveLeave);
router.post('/:id/reject', authenticate, rejectLeave);

export default router; 
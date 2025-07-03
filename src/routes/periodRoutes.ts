import { Router } from 'express';
import { closePeriod, getPeriods } from '../controllers/periodController';

const router = Router();

router.post('/close', closePeriod);
router.get('/', getPeriods);

export default router; 
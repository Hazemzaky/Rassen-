import { Router } from 'express';
import * as fuelLogController from '../controllers/fuelLogController';

const router = Router();

router.post('/', fuelLogController.createFuelLog);
router.get('/', fuelLogController.getFuelLogs);
router.get('/:id', fuelLogController.getFuelLog);
router.put('/:id', fuelLogController.updateFuelLog);
router.delete('/:id', fuelLogController.deleteFuelLog);

export default router; 
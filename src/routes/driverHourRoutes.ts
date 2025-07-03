import { Router } from 'express';
import * as driverHourController from '../controllers/driverHourController';

const router = Router();

router.post('/', driverHourController.createDriverHour);
router.get('/', driverHourController.getDriverHours);
router.get('/:id', driverHourController.getDriverHour);
router.put('/:id', driverHourController.updateDriverHour);
router.delete('/:id', driverHourController.deleteDriverHour);

export default router; 
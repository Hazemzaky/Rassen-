import { Router } from 'express';
import * as maintenanceController from '../controllers/maintenanceController';

const router = Router();

router.post('/', maintenanceController.createMaintenance);
router.get('/', maintenanceController.getMaintenances);
router.get('/:id', maintenanceController.getMaintenance);
router.put('/:id', maintenanceController.updateMaintenance);
router.delete('/:id', maintenanceController.deleteMaintenance);
router.post('/:id/complete', maintenanceController.completeMaintenance);
router.post('/:id/downtime', maintenanceController.trackDowntime);

export default router; 
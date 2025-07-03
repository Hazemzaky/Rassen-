import { Router } from 'express';
import * as depreciationController from '../controllers/depreciationController';

const router = Router();

router.post('/', depreciationController.createDepreciation);
router.get('/', depreciationController.getDepreciations);
router.get('/:id', depreciationController.getDepreciation);
router.put('/:id', depreciationController.updateDepreciation);
router.delete('/:id', depreciationController.deleteDepreciation);

export default router; 
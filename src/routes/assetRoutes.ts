import { Router } from 'express';
import * as assetController from '../controllers/assetController';

const router = Router();

router.post('/', assetController.createAsset);
router.get('/', assetController.getAssets);
router.get('/:id', assetController.getAsset);
router.put('/:id', assetController.updateAsset);
router.delete('/:id', assetController.deleteAsset);
router.patch('/:id/status', assetController.changeAssetStatus);
router.post('/:id/calculate-depreciation', assetController.calculateDepreciation);

export default router; 
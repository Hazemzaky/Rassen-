import { Router } from 'express';
import * as projectController from '../controllers/projectController';

const router = Router();

router.post('/', projectController.createProject);
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);
router.get('/:id/profitability', projectController.getProjectProfitability);

export default router; 
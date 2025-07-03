import { Router } from 'express';
import { createBudget, getBudgets, updateBudget, getVariance, updateForecast, scenarioModeling, recalculateActual } from '../controllers/budgetController';

const router = Router();

router.post('/', createBudget);
router.get('/', getBudgets);
router.put('/:id', updateBudget);
router.get('/:id/variance', getVariance);
router.post('/:id/forecast', updateForecast);
router.get('/scenario-modeling', scenarioModeling);
router.post('/:id/recalculate-actual', recalculateActual);

export default router; 
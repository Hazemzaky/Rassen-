import { Router } from 'express';
import { createEmployee, getEmployees, getEmployee, updateEmployee, deactivateEmployee } from '../controllers/employeeController';

const router = Router();

router.post('/', createEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deactivateEmployee);

export default router; 
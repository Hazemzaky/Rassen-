import { Router } from 'express';
import { register, login, getMe, updateMe, adminUpdateUser, adminUpdatePassword } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getMe);
router.put('/me', authenticate, updateMe);
router.put('/:id', authenticate, adminUpdateUser);
router.put('/:id/password', authenticate, adminUpdatePassword);

export default router; 
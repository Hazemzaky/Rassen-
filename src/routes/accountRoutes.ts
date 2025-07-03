import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { createAccount, getAccounts, updateAccount, deleteAccount, getAccountBalances, getTrialBalance, getGeneralLedger } from '../controllers/accountController';

const router = Router();

router.post('/', authenticate, createAccount);
router.get('/', authenticate, getAccounts);
router.put('/:id', authenticate, updateAccount);
router.delete('/:id', authenticate, deleteAccount);
router.get('/balances', authenticate, getAccountBalances);
router.get('/trial-balance', authenticate, getTrialBalance);
router.get('/general-ledger', authenticate, getGeneralLedger);

export default router; 
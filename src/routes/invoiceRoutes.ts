import { Router } from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth';
import {
  uploadInvoice, getInvoices, createInvoice, updateInvoiceStatus, getAgingReport
} from '../controllers/invoiceController';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authenticate, upload.single('file'), uploadInvoice);
router.get('/', authenticate, getInvoices);
router.post('/', authenticate, createInvoice);
router.put('/:id/status', authenticate, updateInvoiceStatus);
router.get('/aging-report', authenticate, getAgingReport);

export default router; 
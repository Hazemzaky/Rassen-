import { Router } from 'express';
import { createJournalEntry, getJournalEntries, updateJournalEntry, postJournalEntry, reverseJournalEntry } from '../controllers/journalEntryController';

const router = Router();

router.post('/', createJournalEntry);
router.get('/', getJournalEntries);
router.put('/:id', updateJournalEntry);
router.post('/:id/post', postJournalEntry);
router.post('/:id/reverse', reverseJournalEntry);

export default router; 
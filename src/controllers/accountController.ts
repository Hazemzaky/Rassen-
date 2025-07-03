import { Request, Response } from 'express';
import Account from '../models/Account';
import JournalEntry from '../models/JournalEntry';

export const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, code, type, parent, description } = req.body;
    if (!name || !code || !type) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    const parentId = parent === '' ? undefined : parent;
    const account = new Account({ name, code, type, parent: parentId, description });
    await account.save();
    res.status(201).json(account);
  } catch (error) {
    console.error('Error in createAccount:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAccounts = async (req: Request, res: Response): Promise<void> => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    console.error('Error in getAccounts:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, code, type, parent, description } = req.body;
    if (!name || !code || !type) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    const parentId = parent === '' ? undefined : parent;
    const account = await Account.findByIdAndUpdate(id, { name, code, type, parent: parentId, description }, { new: true });
    if (!account) {
      res.status(404).json({ message: 'Account not found' });
      return;
    }
    res.json(account);
  } catch (error) {
    console.error('Error in updateAccount:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const account = await Account.findByIdAndUpdate(id, { active: false }, { new: true });
    if (!account) {
      res.status(404).json({ message: 'Account not found' });
      return;
    }
    res.json({ message: 'Account deactivated' });
  } catch (error) {
    console.error('Error in deleteAccount:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAccountBalances = async (req: Request, res: Response): Promise<void> => {
  try {
    // Only posted entries
    const entries = await JournalEntry.find({ status: 'posted' });
    const balances: Record<string, { account: string; name: string; code: string; type: string; debit: number; credit: number; balance: number }> = {};
    for (const entry of entries) {
      for (const line of entry.lines) {
        const accId = line.account.toString();
        if (!balances[accId]) {
          // Get account details
          const acc = await Account.findById(accId);
          if (!acc) continue;
          balances[accId] = { account: accId, name: acc.name, code: acc.code, type: acc.type, debit: 0, credit: 0, balance: 0 };
        }
        balances[accId].debit += Number(line.debit);
        balances[accId].credit += Number(line.credit);
        balances[accId].balance = balances[accId].debit - balances[accId].credit;
      }
    }
    res.json(Object.values(balances));
  } catch (error) {
    console.error('Error in getAccountBalances:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getTrialBalance = async (req: Request, res: Response): Promise<void> => {
  try {
    // Only posted entries
    const entries = await JournalEntry.find({ status: 'posted' });
    const balances: Record<string, { account: string; name: string; code: string; type: string; debit: number; credit: number; balance: number }> = {};
    for (const entry of entries) {
      for (const line of entry.lines) {
        const accId = line.account.toString();
        if (!balances[accId]) {
          const acc = await Account.findById(accId);
          if (!acc) continue;
          balances[accId] = { account: accId, name: acc.name, code: acc.code, type: acc.type, debit: 0, credit: 0, balance: 0 };
        }
        balances[accId].debit += Number(line.debit);
        balances[accId].credit += Number(line.credit);
        balances[accId].balance = balances[accId].debit - balances[accId].credit;
      }
    }
    // Totals
    const totalDebit = Object.values(balances).reduce((sum, b) => sum + b.debit, 0);
    const totalCredit = Object.values(balances).reduce((sum, b) => sum + b.credit, 0);
    res.json({ balances: Object.values(balances), totalDebit, totalCredit, balanced: totalDebit === totalCredit });
  } catch (error) {
    console.error('Error in getTrialBalance:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getGeneralLedger = async (req: Request, res: Response): Promise<void> => {
  try {
    const { accountId, period } = req.query;
    if (!accountId) {
      res.status(400).json({ message: 'accountId is required' });
      return;
    }
    const filter: any = { status: 'posted', 'lines.account': accountId };
    if (period) filter.period = period;
    const entries = await JournalEntry.find(filter).sort({ date: 1 });
    let runningBalance = 0;
    const ledger = [];
    for (const entry of entries) {
      for (const line of entry.lines) {
        if (line.account.toString() === accountId) {
          runningBalance += Number(line.debit) - Number(line.credit);
          ledger.push({
            date: entry.date,
            description: entry.description,
            debit: line.debit,
            credit: line.credit,
            balance: runningBalance,
            entryId: entry._id,
            reference: entry.reference,
          });
        }
      }
    }
    res.json(ledger);
  } catch (error) {
    console.error('Error in getGeneralLedger:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getJournalEntries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { period, account, status } = req.query;
    const filter: any = {};
    if (period) filter.period = period;
    if (status) filter.status = status;
    if (account) filter['lines.account'] = account;
    // Populate account for other uses, but sanitize before sending
    const entries = await JournalEntry.find(filter).populate('lines.account');
    const sanitized = entries.map(entry => ({
      ...entry.toObject(),
      lines: entry.lines.map((line: any) => ({
        ...line,
        account: typeof line.account === 'object' && line.account._id ? line.account._id : line.account
      }))
    }));
    res.json(sanitized);
  } catch (error) {
    console.error('Error in getJournalEntries:', error);
    res.status(500).json({ message: 'Server error', error });
  }
}; 
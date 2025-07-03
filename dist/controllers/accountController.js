"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeneralLedger = exports.getTrialBalance = exports.getAccountBalances = exports.deleteAccount = exports.updateAccount = exports.getAccounts = exports.createAccount = void 0;
const Account_1 = __importDefault(require("../models/Account"));
const JournalEntry_1 = __importDefault(require("../models/JournalEntry"));
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, code, type, parent, description } = req.body;
        const account = new Account_1.default({ name, code, type, parent, description });
        yield account.save();
        res.status(201).json(account);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createAccount = createAccount;
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield Account_1.default.find();
        res.json(accounts);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getAccounts = getAccounts;
const updateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const account = yield Account_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!account) {
            res.status(404).json({ message: 'Account not found' });
            return;
        }
        res.json(account);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateAccount = updateAccount;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const account = yield Account_1.default.findByIdAndUpdate(id, { active: false }, { new: true });
        if (!account) {
            res.status(404).json({ message: 'Account not found' });
            return;
        }
        res.json({ message: 'Account deactivated' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.deleteAccount = deleteAccount;
const getAccountBalances = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Only posted entries
        const entries = yield JournalEntry_1.default.find({ status: 'posted' });
        const balances = {};
        for (const entry of entries) {
            for (const line of entry.lines) {
                const accId = line.account.toString();
                if (!balances[accId]) {
                    // Get account details
                    const acc = yield Account_1.default.findById(accId);
                    if (!acc)
                        continue;
                    balances[accId] = { account: accId, name: acc.name, code: acc.code, type: acc.type, debit: 0, credit: 0, balance: 0 };
                }
                balances[accId].debit += Number(line.debit);
                balances[accId].credit += Number(line.credit);
                balances[accId].balance = balances[accId].debit - balances[accId].credit;
            }
        }
        res.json(Object.values(balances));
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getAccountBalances = getAccountBalances;
const getTrialBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Only posted entries
        const entries = yield JournalEntry_1.default.find({ status: 'posted' });
        const balances = {};
        for (const entry of entries) {
            for (const line of entry.lines) {
                const accId = line.account.toString();
                if (!balances[accId]) {
                    const acc = yield Account_1.default.findById(accId);
                    if (!acc)
                        continue;
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
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getTrialBalance = getTrialBalance;
const getGeneralLedger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountId, period } = req.query;
        if (!accountId) {
            res.status(400).json({ message: 'accountId is required' });
            return;
        }
        const filter = { status: 'posted', 'lines.account': accountId };
        if (period)
            filter.period = period;
        const entries = yield JournalEntry_1.default.find(filter).sort({ date: 1 });
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
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getGeneralLedger = getGeneralLedger;

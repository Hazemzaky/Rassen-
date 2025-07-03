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
exports.getIncome = exports.createIncome = exports.deleteExpense = exports.updateExpense = exports.getExpense = exports.getExpenses = exports.createExpense = void 0;
const Expense_1 = __importDefault(require("../models/Expense"));
const Period_1 = require("../models/Period");
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, description, date, category, user, invoice, currency, depreciationStart, depreciationEnd, managementDepartment, customType } = req.body;
        const period = date ? new Date(date).toISOString().slice(0, 7) : undefined;
        if (period && (yield (0, Period_1.isPeriodClosed)(period))) {
            res.status(403).json({ message: 'This period is locked and cannot be edited.' });
            return;
        }
        const proofUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
        const expense = new Expense_1.default({
            amount,
            description,
            date,
            category: category === 'other' ? customType : category,
            user,
            invoice,
            currency,
            depreciationStart,
            depreciationEnd,
            managementDepartment,
            proofUrl,
            customType: category === 'other' ? customType : undefined,
        });
        yield expense.save();
        res.status(201).json(expense);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createExpense = createExpense;
const getExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let expenses = yield Expense_1.default.find().populate('user').populate('invoice');
        // Filter out expenses where user is null (i.e., population failed)
        expenses = expenses.filter(e => e.user);
        res.json(expenses);
    }
    catch (error) {
        console.error('Error in getExpenses:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getExpenses = getExpenses;
const getExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expense = yield Expense_1.default.findById(req.params.id).populate('user').populate('invoice');
        if (!expense) {
            res.status(404).json({ message: 'Expense not found' });
            return;
        }
        res.json(expense);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getExpense = getExpense;
const updateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.body;
        const period = date ? new Date(date).toISOString().slice(0, 7) : undefined;
        if (period && (yield (0, Period_1.isPeriodClosed)(period))) {
            res.status(403).json({ message: 'This period is locked and cannot be edited.' });
            return;
        }
        const expense = yield Expense_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!expense) {
            res.status(404).json({ message: 'Expense not found' });
            return;
        }
        res.json(expense);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateExpense = updateExpense;
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expense = yield Expense_1.default.findByIdAndDelete(req.params.id);
        if (!expense) {
            res.status(404).json({ message: 'Expense not found' });
            return;
        }
        res.json({ message: 'Expense deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.deleteExpense = deleteExpense;
const createIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, description, date, user, currency, managementDepartment } = req.body;
        const period = date ? new Date(date).toISOString().slice(0, 7) : undefined;
        if (period && (yield (0, Period_1.isPeriodClosed)(period))) {
            res.status(403).json({ message: 'This period is locked and cannot be edited.' });
            return;
        }
        const income = new Expense_1.default({
            amount,
            description,
            date,
            category: 'income',
            user,
            currency,
            managementDepartment,
        });
        yield income.save();
        res.status(201).json(income);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createIncome = createIncome;
const getIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const income = yield Expense_1.default.find({ category: 'income' });
        res.json(income);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getIncome = getIncome;

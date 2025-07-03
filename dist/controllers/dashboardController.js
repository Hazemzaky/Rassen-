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
exports.getCashFlowStatement = exports.getBalanceSheet = exports.getIncomeStatement = exports.getKPIs = exports.getSummary = void 0;
const Expense_1 = __importDefault(require("../models/Expense"));
const Invoice_1 = __importDefault(require("../models/Invoice"));
const User_1 = __importDefault(require("../models/User"));
const getSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const totalExpenses = yield Expense_1.default.aggregate([
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const byCategory = yield Expense_1.default.aggregate([
            { $group: { _id: '$category', total: { $sum: '$amount' } } }
        ]);
        const invoiceCount = yield Invoice_1.default.countDocuments();
        const userCount = yield User_1.default.countDocuments();
        const recentExpenses = yield Expense_1.default.find().sort({ date: -1 }).limit(3).select('description amount category date');
        const recentInvoices = yield Invoice_1.default.find().sort({ uploadDate: -1 }).limit(2).select('fileUrl uploadDate');
        res.json({
            total: ((_a = totalExpenses[0]) === null || _a === void 0 ? void 0 : _a.total) || 0,
            byCategory,
            invoiceCount,
            userCount,
            recentActivity: [
                ...recentExpenses.map((e) => `Expense: ${e.description} (${e.category}) - $${e.amount}`),
                ...recentInvoices.map((i) => `Invoice uploaded: ${i.fileUrl}`)
            ]
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getSummary = getSummary;
// Helper to get date range from query or default to current financial year
function getDateRange(req) {
    let { start, end } = req.query;
    let startDate, endDate;
    if (start && end) {
        startDate = new Date(start);
        endDate = new Date(end);
    }
    else {
        // Default: current financial year (Apr 1 - Mar 31)
        const now = new Date();
        const year = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
        startDate = new Date(`${year}-04-01T00:00:00.000Z`);
        endDate = new Date(`${year + 1}-03-31T23:59:59.999Z`);
    }
    return { startDate, endDate };
}
const getKPIs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { startDate, endDate } = getDateRange(req);
        // Revenue: category === 'income'
        const revenueAgg = yield Expense_1.default.aggregate([
            { $match: { category: 'income', date: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const revenue = ((_a = revenueAgg[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
        // Expenses: category === 'expenses'
        const expensesAgg = yield Expense_1.default.aggregate([
            { $match: { category: 'expenses', date: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const expenses = ((_b = expensesAgg[0]) === null || _b === void 0 ? void 0 : _b.total) || 0;
        // Penalties
        const penaltyAgg = yield Expense_1.default.aggregate([
            { $match: { category: 'penalty', date: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const penalties = ((_c = penaltyAgg[0]) === null || _c === void 0 ? void 0 : _c.total) || 0;
        // Depreciation
        const depreciationAgg = yield Expense_1.default.aggregate([
            { $match: { category: 'depreciation', date: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const depreciation = ((_d = depreciationAgg[0]) === null || _d === void 0 ? void 0 : _d.total) || 0;
        // Cash flow: income - expenses
        const cashFlow = revenue - expenses;
        // Gross profit: revenue - expenses
        const grossProfit = revenue - expenses;
        // Net profit: revenue - expenses - penalties - depreciation
        const netProfit = revenue - expenses - penalties - depreciation;
        res.json({
            revenue,
            expenses,
            penalties,
            depreciation,
            cashFlow,
            grossProfit,
            netProfit
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getKPIs = getKPIs;
const getIncomeStatement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { startDate, endDate } = getDateRange(req);
        const revenueAgg = yield Expense_1.default.aggregate([
            { $match: { category: 'income', date: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const revenue = ((_a = revenueAgg[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
        const expensesAgg = yield Expense_1.default.aggregate([
            { $match: { category: 'expenses', date: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const expenses = ((_b = expensesAgg[0]) === null || _b === void 0 ? void 0 : _b.total) || 0;
        const penaltyAgg = yield Expense_1.default.aggregate([
            { $match: { category: 'penalty', date: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const penalties = ((_c = penaltyAgg[0]) === null || _c === void 0 ? void 0 : _c.total) || 0;
        const depreciationAgg = yield Expense_1.default.aggregate([
            { $match: { category: 'depreciation', date: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const depreciation = ((_d = depreciationAgg[0]) === null || _d === void 0 ? void 0 : _d.total) || 0;
        const netProfit = revenue - expenses - penalties - depreciation;
        res.json({
            revenue,
            expenses,
            penalties,
            depreciation,
            netProfit
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getIncomeStatement = getIncomeStatement;
const getBalanceSheet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Mock data, as you don't have assets/liabilities models
    res.json({
        assets: 0,
        liabilities: 0,
        equity: 0,
        note: 'Balance sheet data not available. Add Asset/Liability models for real data.'
    });
});
exports.getBalanceSheet = getBalanceSheet;
const getCashFlowStatement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { startDate, endDate } = getDateRange(req);
        // Inflows: income
        const inflowAgg = yield Expense_1.default.aggregate([
            { $match: { category: 'income', date: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const inflows = ((_a = inflowAgg[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
        // Outflows: expenses + penalty + depreciation
        const outflowAgg = yield Expense_1.default.aggregate([
            { $match: { category: { $in: ['expenses', 'penalty', 'depreciation'] }, date: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const outflows = ((_b = outflowAgg[0]) === null || _b === void 0 ? void 0 : _b.total) || 0;
        const netCashFlow = inflows - outflows;
        res.json({
            inflows,
            outflows,
            netCashFlow
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getCashFlowStatement = getCashFlowStatement;

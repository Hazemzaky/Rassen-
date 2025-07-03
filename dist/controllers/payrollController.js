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
exports.processPayroll = exports.updatePayroll = exports.getPayroll = exports.getPayrolls = exports.createPayroll = void 0;
const Payroll_1 = __importDefault(require("../models/Payroll"));
const Period_1 = require("../models/Period");
const createPayroll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employee, period, baseSalary, benefits, leaveCost, reimbursements, deductions, netPay, status } = req.body;
        if (period && (yield (0, Period_1.isPeriodClosed)(period))) {
            res.status(403).json({ message: 'This period is locked and cannot be edited.' });
            return;
        }
        const payroll = new Payroll_1.default({ employee, period, baseSalary, benefits, leaveCost, reimbursements, deductions, netPay, status });
        yield payroll.save();
        res.status(201).json(payroll);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createPayroll = createPayroll;
const getPayrolls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payrolls = yield Payroll_1.default.find().populate('employee');
        res.json(payrolls);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getPayrolls = getPayrolls;
const getPayroll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payroll = yield Payroll_1.default.findById(req.params.id).populate('employee');
        if (!payroll) {
            res.status(404).json({ message: 'Payroll not found' });
            return;
        }
        res.json(payroll);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getPayroll = getPayroll;
const updatePayroll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { period } = req.body;
        if (period && (yield (0, Period_1.isPeriodClosed)(period))) {
            res.status(403).json({ message: 'This period is locked and cannot be edited.' });
            return;
        }
        const payroll = yield Payroll_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!payroll) {
            res.status(404).json({ message: 'Payroll not found' });
            return;
        }
        res.json(payroll);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updatePayroll = updatePayroll;
const processPayroll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const payroll = yield Payroll_1.default.findById(id);
        if (!payroll) {
            res.status(404).json({ message: 'Payroll not found' });
            return;
        }
        payroll.status = 'processed';
        yield payroll.save();
        res.json(payroll);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.processPayroll = processPayroll;

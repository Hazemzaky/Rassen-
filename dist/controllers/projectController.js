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
exports.getProjectProfitability = exports.deleteProject = exports.updateProject = exports.getProject = exports.getProjects = exports.createProject = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Project_1 = __importDefault(require("../models/Project"));
const Expense_1 = __importDefault(require("../models/Expense"));
const Payroll_1 = __importDefault(require("../models/Payroll"));
const FuelLog_1 = __importDefault(require("../models/FuelLog"));
const DriverHour_1 = __importDefault(require("../models/DriverHour"));
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = new Project_1.default(req.body);
        yield project.save();
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createProject = createProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Project_1.default.find();
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getProjects = getProjects;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.default.findById(req.params.id);
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getProject = getProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.default.findByIdAndDelete(req.params.id);
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        res.json({ message: 'Project deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.deleteProject = deleteProject;
const getProjectProfitability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const { id } = req.params;
        // Revenue: sum of all income (category: 'income') assigned to this project
        const revenueAgg = yield Expense_1.default.aggregate([
            { $match: { project: new mongoose_1.default.Types.ObjectId(id), category: 'income' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const revenue = ((_a = revenueAgg[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
        // Costs: sum of all expenses, payroll, fuel logs, driver hours assigned to this project
        const expenseAgg = yield Expense_1.default.aggregate([
            { $match: { project: new mongoose_1.default.Types.ObjectId(id), category: { $ne: 'income' } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const expenses = ((_b = expenseAgg[0]) === null || _b === void 0 ? void 0 : _b.total) || 0;
        const payrollAgg = yield Payroll_1.default.aggregate([
            { $match: { project: new mongoose_1.default.Types.ObjectId(id) } },
            { $group: { _id: null, total: { $sum: '$netPay' } } }
        ]);
        const payroll = ((_c = payrollAgg[0]) === null || _c === void 0 ? void 0 : _c.total) || 0;
        const fuelAgg = yield FuelLog_1.default.aggregate([
            { $match: { project: new mongoose_1.default.Types.ObjectId(id) } },
            { $group: { _id: null, total: { $sum: '$cost' } } }
        ]);
        const fuel = ((_d = fuelAgg[0]) === null || _d === void 0 ? void 0 : _d.total) || 0;
        const driverHourAgg = yield DriverHour_1.default.aggregate([
            { $match: { project: new mongoose_1.default.Types.ObjectId(id) } },
            { $group: { _id: null, total: { $sum: '$cost' } } }
        ]);
        const driverHours = ((_e = driverHourAgg[0]) === null || _e === void 0 ? void 0 : _e.total) || 0;
        const totalCost = expenses + payroll + fuel + driverHours;
        const profit = revenue - totalCost;
        res.json({ revenue, expenses, payroll, fuel, driverHours, totalCost, profit });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getProjectProfitability = getProjectProfitability;

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
exports.deleteFuelLog = exports.updateFuelLog = exports.getFuelLog = exports.getFuelLogs = exports.createFuelLog = void 0;
const FuelLog_1 = __importDefault(require("../models/FuelLog"));
const createFuelLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fuelLog = new FuelLog_1.default(req.body);
        yield fuelLog.save();
        res.status(201).json(fuelLog);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createFuelLog = createFuelLog;
const getFuelLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {};
        if (req.query.project)
            filter.project = req.query.project;
        const fuelLogs = yield FuelLog_1.default.find(filter).populate('driver').populate('project');
        res.json(fuelLogs);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getFuelLogs = getFuelLogs;
const getFuelLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fuelLog = yield FuelLog_1.default.findById(req.params.id).populate('driver').populate('project');
        if (!fuelLog) {
            res.status(404).json({ message: 'Fuel log not found' });
            return;
        }
        res.json(fuelLog);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getFuelLog = getFuelLog;
const updateFuelLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fuelLog = yield FuelLog_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!fuelLog) {
            res.status(404).json({ message: 'Fuel log not found' });
            return;
        }
        res.json(fuelLog);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateFuelLog = updateFuelLog;
const deleteFuelLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fuelLog = yield FuelLog_1.default.findByIdAndDelete(req.params.id);
        if (!fuelLog) {
            res.status(404).json({ message: 'Fuel log not found' });
            return;
        }
        res.json({ message: 'Fuel log deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.deleteFuelLog = deleteFuelLog;

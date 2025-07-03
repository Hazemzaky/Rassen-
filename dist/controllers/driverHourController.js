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
exports.deleteDriverHour = exports.updateDriverHour = exports.getDriverHour = exports.getDriverHours = exports.createDriverHour = void 0;
const DriverHour_1 = __importDefault(require("../models/DriverHour"));
const createDriverHour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverHour = new DriverHour_1.default(req.body);
        yield driverHour.save();
        res.status(201).json(driverHour);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createDriverHour = createDriverHour;
const getDriverHours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {};
        if (req.query.project)
            filter.project = req.query.project;
        const driverHours = yield DriverHour_1.default.find(filter).populate('employee').populate('project');
        res.json(driverHours);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getDriverHours = getDriverHours;
const getDriverHour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverHour = yield DriverHour_1.default.findById(req.params.id).populate('employee').populate('project');
        if (!driverHour) {
            res.status(404).json({ message: 'Driver hour not found' });
            return;
        }
        res.json(driverHour);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getDriverHour = getDriverHour;
const updateDriverHour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverHour = yield DriverHour_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!driverHour) {
            res.status(404).json({ message: 'Driver hour not found' });
            return;
        }
        res.json(driverHour);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateDriverHour = updateDriverHour;
const deleteDriverHour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverHour = yield DriverHour_1.default.findByIdAndDelete(req.params.id);
        if (!driverHour) {
            res.status(404).json({ message: 'Driver hour not found' });
            return;
        }
        res.json({ message: 'Driver hour deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.deleteDriverHour = deleteDriverHour;

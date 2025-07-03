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
exports.trackDowntime = exports.completeMaintenance = exports.deleteMaintenance = exports.updateMaintenance = exports.getMaintenance = exports.getMaintenances = exports.createMaintenance = void 0;
const Maintenance_1 = __importDefault(require("../models/Maintenance"));
const createMaintenance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const maintenance = new Maintenance_1.default(req.body);
        yield maintenance.save();
        res.status(201).json(maintenance);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createMaintenance = createMaintenance;
const getMaintenances = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const maintenances = yield Maintenance_1.default.find().populate('asset');
        res.json(maintenances);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getMaintenances = getMaintenances;
const getMaintenance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const maintenance = yield Maintenance_1.default.findById(req.params.id).populate('asset');
        if (!maintenance) {
            res.status(404).json({ message: 'Maintenance not found' });
            return;
        }
        res.json(maintenance);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getMaintenance = getMaintenance;
const updateMaintenance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const maintenance = yield Maintenance_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!maintenance) {
            res.status(404).json({ message: 'Maintenance not found' });
            return;
        }
        res.json(maintenance);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateMaintenance = updateMaintenance;
const deleteMaintenance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const maintenance = yield Maintenance_1.default.findByIdAndDelete(req.params.id);
        if (!maintenance) {
            res.status(404).json({ message: 'Maintenance not found' });
            return;
        }
        res.json({ message: 'Maintenance deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.deleteMaintenance = deleteMaintenance;
const completeMaintenance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Skeleton: implement completion logic here
    res.json({ message: 'Maintenance completion not implemented yet.' });
});
exports.completeMaintenance = completeMaintenance;
const trackDowntime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Skeleton: implement downtime tracking logic here
    res.json({ message: 'Downtime tracking not implemented yet.' });
});
exports.trackDowntime = trackDowntime;

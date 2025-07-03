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
exports.deleteDepreciation = exports.updateDepreciation = exports.getDepreciation = exports.getDepreciations = exports.createDepreciation = void 0;
const Depreciation_1 = __importDefault(require("../models/Depreciation"));
const createDepreciation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const depreciation = new Depreciation_1.default(req.body);
        yield depreciation.save();
        res.status(201).json(depreciation);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createDepreciation = createDepreciation;
const getDepreciations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const depreciations = yield Depreciation_1.default.find().populate('asset');
        res.json(depreciations);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getDepreciations = getDepreciations;
const getDepreciation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const depreciation = yield Depreciation_1.default.findById(req.params.id).populate('asset');
        if (!depreciation) {
            res.status(404).json({ message: 'Depreciation not found' });
            return;
        }
        res.json(depreciation);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getDepreciation = getDepreciation;
const updateDepreciation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const depreciation = yield Depreciation_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!depreciation) {
            res.status(404).json({ message: 'Depreciation not found' });
            return;
        }
        res.json(depreciation);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateDepreciation = updateDepreciation;
const deleteDepreciation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const depreciation = yield Depreciation_1.default.findByIdAndDelete(req.params.id);
        if (!depreciation) {
            res.status(404).json({ message: 'Depreciation not found' });
            return;
        }
        res.json({ message: 'Depreciation deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.deleteDepreciation = deleteDepreciation;

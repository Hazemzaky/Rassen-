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
exports.calculateDepreciation = exports.changeAssetStatus = exports.deleteAsset = exports.updateAsset = exports.getAsset = exports.getAssets = exports.createAsset = void 0;
const Asset_1 = __importDefault(require("../models/Asset"));
const createAsset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asset = new Asset_1.default(req.body);
        yield asset.save();
        res.status(201).json(asset);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createAsset = createAsset;
const getAssets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assets = yield Asset_1.default.find();
        res.json(assets);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getAssets = getAssets;
const getAsset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asset = yield Asset_1.default.findById(req.params.id);
        if (!asset) {
            res.status(404).json({ message: 'Asset not found' });
            return;
        }
        res.json(asset);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getAsset = getAsset;
const updateAsset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asset = yield Asset_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!asset) {
            res.status(404).json({ message: 'Asset not found' });
            return;
        }
        res.json(asset);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateAsset = updateAsset;
const deleteAsset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asset = yield Asset_1.default.findByIdAndDelete(req.params.id);
        if (!asset) {
            res.status(404).json({ message: 'Asset not found' });
            return;
        }
        res.json({ message: 'Asset deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.deleteAsset = deleteAsset;
const changeAssetStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const asset = yield Asset_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!asset) {
            res.status(404).json({ message: 'Asset not found' });
            return;
        }
        res.json(asset);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.changeAssetStatus = changeAssetStatus;
const calculateDepreciation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Skeleton: implement depreciation calculation logic here
    res.json({ message: 'Depreciation calculation not implemented yet.' });
});
exports.calculateDepreciation = calculateDepreciation;

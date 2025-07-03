"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const expenseRoutes_1 = __importDefault(require("./routes/expenseRoutes"));
const invoiceRoutes_1 = __importDefault(require("./routes/invoiceRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const budgetRoutes_1 = __importDefault(require("./routes/budgetRoutes"));
const accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
const journalEntryRoutes_1 = __importDefault(require("./routes/journalEntryRoutes"));
const periodRoutes_1 = __importDefault(require("./routes/periodRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const fuelLogRoutes_1 = __importDefault(require("./routes/fuelLogRoutes"));
const driverHourRoutes_1 = __importDefault(require("./routes/driverHourRoutes"));
const assetRoutes_1 = __importDefault(require("./routes/assetRoutes"));
const maintenanceRoutes_1 = __importDefault(require("./routes/maintenanceRoutes"));
const depreciationRoutes_1 = __importDefault(require("./routes/depreciationRoutes"));
const inventoryRoutes_1 = __importDefault(require("./routes/inventoryRoutes"));
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/financedb';
// Connect to MongoDB
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
app.get('/', (req, res) => {
    res.send('Financial Management API is running');
});
app.use('/api/auth', authRoutes_1.default);
app.use('/api/expenses', expenseRoutes_1.default);
app.use('/api/invoices', invoiceRoutes_1.default);
app.use('/api/dashboard', dashboardRoutes_1.default);
app.use('/api/budgets', budgetRoutes_1.default);
app.use('/api/accounts', accountRoutes_1.default);
app.use('/api/journal-entries', journalEntryRoutes_1.default);
app.use('/api/periods', periodRoutes_1.default);
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/fuel-logs', fuelLogRoutes_1.default);
app.use('/api/driver-hours', driverHourRoutes_1.default);
app.use('/api/assets', assetRoutes_1.default);
app.use('/api/maintenance', maintenanceRoutes_1.default);
app.use('/api/depreciation', depreciationRoutes_1.default);
app.use('/api/inventory', inventoryRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

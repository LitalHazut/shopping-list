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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const shopService_1 = __importDefault(require("./shopService"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path = __importStar(require("path"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
if (process.env.NONE_ENV === 'production') {
    app.use(express_1.default.static(path.resolve(__dirname, 'public')));
}
else {
    const corsOptions = {
        origin: ['*'],
        credentials: true,
    };
    app.use((0, cors_1.default)(corsOptions));
}
const shopService = new shopService_1.default();
// Route to get all posts
app.get('/api/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ categories: yield shopService.getAllCategories() });
}));
app.get('/api/test', (req, res) => {
    res.send('Test route is working!');
});
app.post('/api/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const categoryId = req.body.categoryId;
    const count = req.body.count;
    res.send({ product: yield shopService.addProduct(name, categoryId, count) });
}));
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

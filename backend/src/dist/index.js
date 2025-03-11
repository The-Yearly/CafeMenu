"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1_1 = require("./routes/v1");
var cors = require('cors');
const port = 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.use('/api/v1', v1_1.router);
app.listen(process.env.PORT || port);
console.log('Server started at http://localhost:' + port);

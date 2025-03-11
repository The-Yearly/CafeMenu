"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.ItemSchema = exports.OrderSchema = exports.cart = void 0;
const zod_1 = __importDefault(require("zod"));
exports.cart = zod_1.default.object({
    itemId: zod_1.default.number(),
    name: zod_1.default.string(),
    bio: zod_1.default.string(),
    image: zod_1.default.string(),
    category: zod_1.default.string(),
    subcategory: zod_1.default.string(),
    isvegan: zod_1.default.boolean(),
    cost: zod_1.default.number().positive(),
    quantity: zod_1.default.number().positive(),
});
exports.OrderSchema = zod_1.default.object({
    tableId: zod_1.default.number().positive(),
    totalCost: zod_1.default.number().positive(),
    cartItems: exports.cart.array()
});
exports.ItemSchema = zod_1.default.object({
    name: zod_1.default.string(),
    bio: zod_1.default.string(),
    image: zod_1.default.string(),
    category: zod_1.default.string(),
    subcategory: zod_1.default.string(),
    isvegan: zod_1.default.boolean(),
    cost: zod_1.default.number().positive(),
    avalability: zod_1.default.boolean()
});
exports.users = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string().min(8),
    isAdmin: zod_1.default.boolean()
});

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const client_1 = require("../../utils/client");
const utils_1 = require("../../utils");
exports.router = (0, express_1.Router)();
//getting the menu
exports.router.get('/menu', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("e hit");
    const response = yield client_1.client.items.findMany({});
    if (!response) {
        console.log("NO response");
        res.status(400).json({
            message: "No items found"
        });
    }
    res.status(200).json({
        items: response
    });
}));
//placing an order
exports.router.post('/orders/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedResponse = utils_1.OrderSchema.safeParse(req.body);
    if (!parsedResponse.success) {
        res.status(400).json({
            message: "Validation failed"
        });
        return;
    }
    const tableId = parsedResponse.data.tableId;
    if (!tableId) {
        res.status(400).json({
            message: "No table found"
        });
        return;
    }
    let placedOrder = yield client_1.client.$transaction(() => __awaiter(void 0, void 0, void 0, function* () {
        //transaction for creating order
        var _a;
        //creating order
        const order = yield client_1.client.orders.create({
            data: {
                tableId: tableId,
                totalCost: (_a = parsedResponse.data) === null || _a === void 0 ? void 0 : _a.totalCost,
            }
        });
        const cartItems = yield client_1.client.cart.createMany({
            data: parsedResponse.data.cartItems.map((item) => ({
                orderId: order.orderId,
                itemId: item.itemId,
                quantity: item.quantity
            }))
        });
        console.log("order added");
        return order.orderId;
    }));
    res.status(200).json({
        orderId: placedOrder
    });
}));
//item with itemId
exports.router.get('/item', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = Number(req.query.id);
    if (!itemId) {
        res.status(400).json({
            message: "No item id found"
        });
        return;
    }
    try {
        const response = yield client_1.client.items.findFirst({
            where: {
                itemId: itemId
            }
        });
        if (!response) {
            res.status(400).json({
                message: "No item found"
            });
        }
        res.status(200).json({
            item: response
        });
    }
    catch (error) {
        console.log("Error getting item", error);
    }
}));
//items with category
exports.router.get('/category/:cat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryName = req.params.cat;
    if (!categoryName || Array.isArray(categoryName)) {
        res.status(400).json({
            message: "No such category found"
        });
        return;
    }
    const response = yield client_1.client.items.findMany({
        where: {
            category: categoryName
        }
    });
    if (!response) {
        res.status(400).json({
            message: "No item with that category found"
        });
    }
    res.status(200).json({
        items: response
    });
}));
//routes for getting category
exports.router.get('/getCategories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Cat hit");
    const response = yield client_1.client.category.findMany({});
    if (!response) {
        console.log("NO response");
        res.status(400).json({
            message: "No categories found"
        });
    }
    console.log(response);
    res.status(200).json({
        categories: response
    });
}));
exports.router.post("/userAuth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("users hit");
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const response = yield client_1.client.users.findFirst({
        where: {
            username: username
        }
    });
}));
exports.router.get('/men', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("a hit");
    res.json({ "ss": "ss" });
}));

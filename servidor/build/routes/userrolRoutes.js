"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userrolController_1 = __importDefault(require("../controllers/userrolController"));
class UserrolRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', userrolController_1.default.getToAdd);
    }
}
const userrolRoutes = new UserrolRoutes();
exports.default = userrolRoutes.router;

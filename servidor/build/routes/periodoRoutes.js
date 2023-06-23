"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const periodoController_1 = __importDefault(require("../controllers/periodoController"));
class PeriodoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', periodoController_1.default.getToAdd);
        this.router.post('/add', periodoController_1.default.insert);
    }
}
const periodoRoutes = new PeriodoRoutes();
exports.default = periodoRoutes.router;

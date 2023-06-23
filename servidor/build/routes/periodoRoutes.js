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
        this.router.get('/:id', periodoController_1.default.getToEdit);
        this.router.post('/add', periodoController_1.default.insert);
        this.router.get('/to/list', periodoController_1.default.getAll);
        this.router.post('/edit', periodoController_1.default.editPeriodo);
    }
}
const periodoRoutes = new PeriodoRoutes();
exports.default = periodoRoutes.router;

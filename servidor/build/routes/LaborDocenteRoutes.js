"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const laborDocenteControllers_1 = __importDefault(require("../controllers/laborDocenteControllers"));
class LaborRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', laborDocenteControllers_1.default.list);
        this.router.get('/:id', laborDocenteControllers_1.default.getOne);
        this.router.post('/', laborDocenteControllers_1.default.create);
        this.router.put('/:id', laborDocenteControllers_1.default.update);
        this.router.delete('/:id', laborDocenteControllers_1.default.delete);
        this.router.get('/to/add', laborDocenteControllers_1.default.getToAdd);
    }
}
const laborRoutesRoutes = new LaborRoutes();
exports.default = laborRoutesRoutes.router;

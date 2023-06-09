"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosControllers_1 = __importDefault(require("../controllers/usuariosControllers"));
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuariosControllers_1.default.list);
        this.router.get('/', usuariosControllers_1.default.getOne);
        this.router.post('/', usuariosControllers_1.default.create);
        this.router.delete('/:id', usuariosControllers_1.default.delete);
        this.router.put('/:id', usuariosControllers_1.default.update);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;

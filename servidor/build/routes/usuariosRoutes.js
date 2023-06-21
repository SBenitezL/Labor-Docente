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
        this.router.get('/:id', usuariosControllers_1.default.getOne);
        this.router.get('/:rol', usuariosControllers_1.default.getOneRol);
        this.router.post('/', usuariosControllers_1.default.create);
        this.router.put('/:id', usuariosControllers_1.default.update);
        this.router.delete('/:id', usuariosControllers_1.default.delete);
        this.router.get('/:contrasenia/:login', usuariosControllers_1.default.getUserLogin);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;

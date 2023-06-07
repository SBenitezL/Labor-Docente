"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class UsuariosController {
    index(req, res) {
        database_1.default.query('DESCRIBE USUARIO ');
        res.json('USUARIO');
    }
}
const usuariosController = new UsuariosController();
exports.default = usuariosController;

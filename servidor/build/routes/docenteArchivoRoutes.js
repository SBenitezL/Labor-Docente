"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const docenteArchivoController_1 = __importDefault(require("../controllers/docenteArchivoController"));
class DocenteArchivoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/guardarArchivo', docenteArchivoController_1.default.create);
    }
}
const docenteArchivoRoutes = new DocenteArchivoRoutes();
exports.default = docenteArchivoRoutes.router;

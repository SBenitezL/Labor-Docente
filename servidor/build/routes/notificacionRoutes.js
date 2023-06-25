"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificacionController_1 = __importDefault(require("../controllers/notificacionController"));
class NotificacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:id', notificacionController_1.default.getNotificaciones);
    }
}
const notificacionRoutes = new NotificacionRoutes();
exports.default = notificacionRoutes.router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const evaluacionController_1 = __importDefault(require("../controllers/evaluacionController"));
class EvaluacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', evaluacionController_1.default.list);
        this.router.get('/:id', evaluacionController_1.default.getToOne);
        this.router.post('/', evaluacionController_1.default.create);
        this.router.put("/update/:id", evaluacionController_1.default.update);
        this.router.delete("/:id", evaluacionController_1.default.delete);
        this.router.get("/edit/:id", evaluacionController_1.default.getToEdit);
        this.router.get("/notificar/funcion", evaluacionController_1.default.getToNotify);
    }
}
const evaluacionRoutes = new EvaluacionRoutes();
exports.default = evaluacionRoutes.router;

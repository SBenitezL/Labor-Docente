"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const docenteArchivoController_1 = __importDefault(require("../controllers/docenteArchivoController"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Nombre del archivo original
    }
});
const upload = (0, multer_1.default)({ storage: storage });
class DocenteArchivoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/guardarArchivo/:idEv/:idUser', upload.single('archivo'), docenteArchivoController_1.default.create);
    }
}
const docenteArchivoRoutes = new DocenteArchivoRoutes();
exports.default = docenteArchivoRoutes.router;

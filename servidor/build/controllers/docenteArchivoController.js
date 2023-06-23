"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class DocenteArchivoControllers {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { USR_IDENTIFICACION, USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO, UR_FECHAINICIO, UR_FECHAFIN, ROL_ID, USR_Contrasenia, UserName } = req.body;
            try {
                yield database_1.default.query('INSERT INTO USEROL (USR_IDENTIFICACION, ROL_ID, UR_FECHAINICIO, UR_FECHAFIN) VALUES (?, ?, ?, ?)', [USR_IDENTIFICACION, ROL_ID, UR_FECHAINICIO, UR_FECHAFIN]);
                res.json({ message: 'Archivo insertado correctamente.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al insertar el archivo.' });
            }
        });
    }
}
const docenteArchivoController = new DocenteArchivoControllers();
exports.default = docenteArchivoController;

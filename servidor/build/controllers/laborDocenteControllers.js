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
class LaborDocenteControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.default.query('SELECT * FROM LABOR'); // Desestructurar el resultado para obtener solo el primer elemento (las filas)
            if (Array.isArray(rows)) {
                const laborD = rows.map((row) => row); // Utilizar cualquier tipo genérico para 'row' según tus necesidades
                res.json(laborD);
            }
            else {
                console.error('Invalid result format');
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { labId } = req.params;
            const laborD = yield database_1.default.query('SELECT * FROM LABOR WHERE LAB_ID = ? ', [labId]);
            //console.log(usuario);
            if (laborD.length > 0) {
                return res.json(laborD[0]);
            }
            res.status(404).json({ text: 'Labor docente no encontrada' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO LABOR SET ?', [req.body]);
            res.json({ message: 'Labor docente insertada' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM LABOR WHERE LAB_ID = ?', [id]);
            res.json({ text: 'Labor docente Eliminada' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE LABOR set ? WHERE LAB_ID  = ?', [req.body, id]);
            res.json({ text: 'Actualizando labor docente...' });
        });
    }
    getToAdd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('SELECT LAB_ID, LAB_NOMBRE FROM labor;');
            res.json(rows[0][0]);
        });
    }
}
const laborDocenteController = new LaborDocenteControllers();
exports.default = laborDocenteController;

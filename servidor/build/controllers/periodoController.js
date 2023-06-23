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
class PeriodoController {
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "CALL sp_insertar_periodo(?,?,?)";
            const { PER_NOMBRE, PER_FECHAINICIO, PER_FECHAFIN } = req.body;
            const result = yield database_1.default.query(query, [PER_FECHAINICIO, PER_FECHAFIN, PER_NOMBRE]);
            if (result[0].affectedRows > 0)
                res.json({ message: "Se agregó correctamente." });
            else
                res.json({ message: "No se logró agregar." });
        });
    }
    getToAdd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('CALL sp_consultar_periodos()');
            res.json(rows[0][0]);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query('CALL sp_consultar_periodos_list()');
            res.json(rows[0][0]);
        });
    }
    getToEdit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const row = yield database_1.default.query("CALL sp_consultar_periodos_edit(?)", [id]);
            res.json(row[0][0]);
        });
    }
    editPeriodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "CALL sp_editar_periodo(?,?,?,?)";
            const { PER_ID, PER_NOMBRE, PER_FECHAINICIO, PER_FECHAFIN } = req.body;
            const result = yield database_1.default.query(query, [PER_ID, PER_NOMBRE, PER_FECHAINICIO, PER_FECHAFIN]);
            if (result[0].affectedRows > 0)
                res.json({ message: "Se actualizó correctamente.", icon: "info" });
            else
                res.json({ message: "No se logró actualizar.", icon: "error" });
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "CALL sp_eliminar_periodo(?)";
            const { id } = req.params;
            const resultado = yield database_1.default.query(query, [id]);
            if (resultado.affectedRows > 0)
                res.json({ message: "Se eliminó correctamente" });
            else
                res.json({ message: "No se pudo eliminar." });
        });
    }
}
const periodoController = new PeriodoController();
exports.default = periodoController;

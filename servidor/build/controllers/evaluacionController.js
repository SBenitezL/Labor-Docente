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
class EvaluacionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "CALL sp_consultar_evaluaciones()";
            let evaluaciones = yield database_1.default.query(query);
            res.json(evaluaciones[0][0]);
        });
    }
    getToOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "CALL sp_consultar_evaluacion(?,?)";
            const { id, per_id } = req.params;
            const evaluaciones = (yield database_1.default.query(query, id));
            res.json(evaluaciones[0][0]);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "CALL sp_insert_evaluacion(?,?,?,?,?)";
            const { LAB_ID, PER_ID, USR_IDENTIFICACION, ROL_ID, EVA_ESTADO } = req.body;
            yield database_1.default.query(query, [LAB_ID, PER_ID, USR_IDENTIFICACION, ROL_ID, EVA_ESTADO]);
            res.json({ text: "Creando evaluacion..." });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "CALL sp_eliminar_evaluacion(?)";
            const { id } = req.params;
            const evaluaciones = (yield database_1.default.query(query, id));
            if (evaluaciones[0].affectedRows > 0) {
                res.json({ message: "La evaluacion fue eliminada" });
            }
            else {
                res.json({ message: "La evaluacion no se pudo eliminar" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const query = "CALL sp_actualizar_evaluacion_coordinador (?,?,?,?,?,?);";
            const { LAB_ID, PER_ID, USR_IDENTIFICACION, ROL_ID, EVA_ESTADO } = req.body;
            const evaluaciones = yield database_1.default.query(query, [id, LAB_ID, PER_ID, USR_IDENTIFICACION, ROL_ID, EVA_ESTADO]);
            if (evaluaciones[0].affectedRows > 0) {
                res.json({ message: "La evaluacion fue actualizada" });
            }
            else {
                res.json({ message: "La evaluacion no se pudo actualizar" });
            }
        });
    }
    getToEdit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const query = "CALL consultar_evaluacion_edit (?);";
            const evaluacion = yield database_1.default.query(query, id);
            res.json(evaluacion[0][0]);
        });
    }
}
const evaluacionController = new EvaluacionController();
exports.default = evaluacionController;

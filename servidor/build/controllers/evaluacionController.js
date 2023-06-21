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
    getToNotify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "CALL sp_get_to_notificar()";
            const query2 = "CALL sp_get_administradores()";
            const query3 = "CALL sp_insert_notificacion(?,?)";
            try {
                const evaluaciones = yield database_1.default.query(query);
                const rows = evaluaciones[0][0];
                console.log(rows);
                let msg;
                if (rows.length > 0) {
                    const admins = yield database_1.default.query(query2);
                    const rowsAdmins = admins[0][0];
                    console.log(rowsAdmins);
                    for (let i = 0; i < rows.length; i++) {
                        msg = `La evaluacion ${rows[i].LAB_NOMBRE} del usuario ${rows[i].USU_NOMBRE} sigue en ${rows[i].EVA_ESTADO == 1 ? "ejecucion" : "suspendido"} y se encuentra próxima a finalizar el tiempo establecido`;
                        console.log(msg);
                        for (let j = 0; j < rowsAdmins.length; j++) {
                            console.log(rowsAdmins[j].USR_IDENTIFICACION);
                            yield database_1.default.query(query3, [rowsAdmins[j].USR_IDENTIFICACION, msg]);
                        }
                    }
                }
                res.json({ message: "Se realizo el proceso" });
            }
            catch (error) {
                res.json({ mesagge: 'Error al obtener y notificar:' });
            }
        });
    }
}
const evaluacionController = new EvaluacionController();
exports.default = evaluacionController;

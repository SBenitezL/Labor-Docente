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
class UserrolController {
    getToAdd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield database_1.default.query(`

        SELECT 
            CONCAT(usuario.USU_NOMBRE, ' ' , usuario.USU_APELLIDO) as Nombre, 
            rol.ROL_DESCRIPCION as Rol, 
            userol.USR_IDENTIFICACION as Id, 
            userol.ROL_ID as RolID
        from
            userol INNER JOIN usuario ON userol.USR_IDENTIFICACION = usuario.USR_IDENTIFICACION
            INNER JOIN rol ON userol.ROL_ID = rol.ROL_ID
        where CURRENT_DATE BETWEEN userol.UR_FECHAINICIO and userol.UR_FECHAFIN;`);
            res.json(rows[0][0]);
        });
    }
}
const userrolController = new UserrolController();
exports.default = userrolController;

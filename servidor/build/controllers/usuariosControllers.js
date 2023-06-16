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
class UsuariosControllers {
    /*public async list(req: Request, res: Response) {
        const usuarios = await db.query('SELECT * FROM USUARIO');
        res.json(usuarios);
      }*/
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.default.query('SELECT * FROM USUARIO'); // Desestructurar el resultado para obtener solo el primer elemento (las filas)
            if (Array.isArray(rows)) {
                const usuarios = rows.map((row) => row); // Utilizar cualquier tipo genérico para 'row' según tus necesidades
                res.json(usuarios);
            }
            else {
                console.error('Invalid result format');
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield database_1.default.query('SELECT * FROM USUARIO WHERE USR_IDENTIFICACION  = ?', [id]);
            //console.log(usuario);
            if (usuario.length > 0) {
                return res.json(usuario[0]);
            }
            res.status(404).json({ text: 'Usuario no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO USUARIO SET ?', [req.body]);
            res.json({ message: 'Usuario insertado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM USUARIO WHERE USR_IDENTIFICACION  = ?', [id]);
            res.json({ text: 'Usuario Eliminado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { USR_IDENTIFICACION, USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO } = req.body;
            console.log(req.body);
            yield database_1.default.execute('UPDATE USUARIO SET USU_NOMBRE = ?, USU_APELLIDO = ?, USU_GENERO = ?, USU_ESTUDIO = ? WHERE USR_IDENTIFICACION = ?', [USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO, USR_IDENTIFICACION]);
            res.json({ text: 'Actualizando usuario...' });
        });
    }
}
const usuariosController = new UsuariosControllers();
exports.default = usuariosController;

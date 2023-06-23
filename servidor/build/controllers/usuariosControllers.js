"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const saltRounds = 10; // Número de rondas de hashing
const salt = bcrypt.genSaltSync(saltRounds);
class UsuariosControllers {
    /*public async list(req: Request, res: Response) {
        const usuarios = await db.query('SELECT * FROM USUARIO');
        res.json(usuarios);
      }*/
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.default.query('SELECT * FROM USUARIO'); // Desestructurar el resultado para obtener solo el primer elemento (las filas)
            console.log(salt);
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
            const query = `
          SELECT U.*, UR.*
          FROM USUARIO U
          INNER JOIN USEROL UR ON U.USR_IDENTIFICACION = UR.USR_IDENTIFICACION
          WHERE U.USR_IDENTIFICACION = ?
        `;
            try {
                const [rows] = yield database_1.default.query(query, [id]);
                if (Array.isArray(rows) && rows.length > 0) {
                    const usuario = rows[0];
                    return res.json(usuario);
                }
                res.status(404).json({ text: 'Usuario no encontrado' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ text: 'Error al obtener el usuario' });
            }
        });
    }
    getRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rol } = req.params;
            const query = `
        SELECT U.USR_IDENTIFICACION
        FROM USUARIO U INNER JOIN
        USEROL UR 
        ON U.USR_IDENTIFICACION = UR.USR_IDENTIFICACION
        WHERE UR.ROL_ID = ?
        `;
            console.log("entra");
            try {
                const [rows] = yield database_1.default.query(query, [rol]);
                if (Array.isArray(rows) && rows.length > 0) {
                    const usuario = rows[0];
                    return res.json(usuario);
                }
                res.status(404).json({ text: 'Usuario no encontrado' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ text: 'Error al obtener el usuario' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { USR_IDENTIFICACION, USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO, UR_FECHAINICIO, UR_FECHAFIN, ROL_ID, USR_Contrasenia, UserName } = req.body;
            //const constraseniaHash =  await bcrypt.hash(USR_Contrasenia, 10);
            const constraseniaHash = bcrypt.hashSync(USR_Contrasenia, "$2b$10$d32mcWs6/PVcPjr2Rulqv."); // Genera el hash utilizando la contraseña y la "sal"
            console.log(UserName + "--" + constraseniaHash); // Imprime el hash generado 
            try {
                const existingUser = yield database_1.default.query('SELECT UserName FROM USUARIO WHERE UserName = ?', [UserName]);
                if (existingUser.length > 0) {
                    res.status(500).json({ message: 'El nombre de usuario ya está registrado.' });
                    return;
                }
                // Paso 1: Insertar el usuario en la tabla USUARIO
                yield database_1.default.query('INSERT INTO USUARIO (USR_IDENTIFICACION, USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO, USR_Contrasenia, UserName) VALUES (?, ?, ?, ?, ?, ?, ?)', [USR_IDENTIFICACION, USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO, constraseniaHash, UserName]);
                // Paso 2: Insertar el registro en la tabla USEROL con las fechas correspondientes
                yield database_1.default.query('INSERT INTO USEROL (USR_IDENTIFICACION, ROL_ID, UR_FECHAINICIO, UR_FECHAFIN) VALUES (?, ?, ?, ?)', [USR_IDENTIFICACION, ROL_ID, UR_FECHAINICIO, UR_FECHAFIN]);
                res.json({ message: 'Usuario insertado correctamente.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al insertar el usuario.' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                // Paso 1: Eliminar los registros relacionados en la tabla `userol`
                yield database_1.default.query('DELETE FROM userol WHERE USR_IDENTIFICACION = ?', [id]);
                // Paso 2: Eliminar la fila en la tabla `usuario`
                yield database_1.default.query('DELETE FROM usuario WHERE USR_IDENTIFICACION = ?', [id]);
                res.json({ text: 'Usuario eliminado correctamente' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar el usuario' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { USR_IDENTIFICACION, USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO, UserName, USR_Contrasenia, ROL_ID, UR_FECHAINICIO, UR_FECHAFIN } = req.body;
            try {
                // Paso 1: Actualizar los datos en la tabla `usuario`
                yield database_1.default.query('UPDATE usuario SET USU_NOMBRE = ?, USU_APELLIDO = ?, USU_GENERO = ?, USU_ESTUDIO = ?,UserName = ?,USR_Contrasenia = ? WHERE USR_IDENTIFICACION = ?', [USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO, UserName, USR_Contrasenia, USR_IDENTIFICACION]);
                // Paso 2: Actualizar los datos en la tabla `userol`
                yield database_1.default.query('UPDATE userol SET ROL_ID = ?, UR_FECHAINICIO = ?, UR_FECHAFIN = ? WHERE USR_IDENTIFICACION = ?', [ROL_ID, UR_FECHAINICIO, UR_FECHAFIN, USR_IDENTIFICACION]);
                res.json({ text: 'Usuario actualizado correctamente' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar el usuario' });
            }
        });
    }
    getUserLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { contrasenia, login } = req.params;
            //const constraseniaHash =  await bcrypt.hash(contrasenia, 10);
            //console.log(constraseniaHash);
            const constraseniaHash = bcrypt.hashSync(contrasenia, "$2b$10$d32mcWs6/PVcPjr2Rulqv."); // Genera el hash utilizando la contraseña y la "sal"
            console.log("VERIFICAR CONTRAEÑA" + constraseniaHash); // Imprime el hash generado 
            const query = `
          SELECT UR.ROL_ID, U.USR_IDENTIFICACION
          FROM USUARIO U
          INNER JOIN USEROL UR ON U.USR_IDENTIFICACION = UR.USR_IDENTIFICACION
          WHERE U.UserName = ? AND U.USR_Contrasenia = ? AND CURRENT_DATE BETWEEN UR.UR_FECHAINICIO and UR.UR_FECHAFIN;
        `;
            try {
                const rows = yield database_1.default.query(query, [login, constraseniaHash]);
                if (rows.length > 0) {
                    console.log();
                    return res.json((rows[0]));
                }
                res.status(404).json({ text: 'Usuario no encontrado' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ text: 'Error al obtener el usuario' });
            }
        });
    }
}
const usuariosController = new UsuariosControllers();
exports.default = usuariosController;

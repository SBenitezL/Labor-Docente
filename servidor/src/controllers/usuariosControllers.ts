import {Request, Response} from 'express';
import db from '../database';
import * as bcrypt from 'bcrypt';
const saltRounds = 10; // Número de rondas de hashing
const salt = bcrypt.genSaltSync(saltRounds);
class UsuariosControllers{
     
    /*public async list(req: Request, res: Response) {
        const usuarios = await db.query('SELECT * FROM USUARIO');  
        res.json(usuarios);
      }*/
      public async list(req: Request, res: Response) {
        const [rows] = await db.query('SELECT * FROM USUARIO'); // Desestructurar el resultado para obtener solo el primer elemento (las filas)
        console.log(salt);
        if (Array.isArray(rows)) {
          const usuarios = rows.map((row: any) => row); // Utilizar cualquier tipo genérico para 'row' según tus necesidades
          res.json(usuarios);
        } else {
          console.error('Invalid result format');
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
      public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const query = `
          SELECT U.*, UR.*
          FROM USUARIO U
          INNER JOIN USEROL UR ON U.USR_IDENTIFICACION = UR.USR_IDENTIFICACION
          WHERE U.USR_IDENTIFICACION = ?
        `;
        
        try {
          const [rows] = await db.query(query, [id]);
      
          if (Array.isArray(rows) && rows.length > 0) {
            const usuario = rows[0];
            return res.json(usuario);
          }
      
          res.status(404).json({ text: 'Usuario no encontrado' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ text: 'Error al obtener el usuario' });
        }
      }
      public async getRol(req: Request, res: Response): Promise<any> {
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
          const [rows] = await db.query(query, [rol]);
      
          if (Array.isArray(rows) && rows.length > 0) {
            const usuario = rows[0];
            return res.json(usuario);
          }
      
          res.status(404).json({ text: 'Usuario no encontrado' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ text: 'Error al obtener el usuario' });
        }
      }
      
    public async create(req: Request, res: Response) {
      const { USR_IDENTIFICACION, USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO, UR_FECHAINICIO, UR_FECHAFIN, ROL_ID, USR_Contrasenia, UserName } = req.body;
      
      //const constraseniaHash =  await bcrypt.hash(USR_Contrasenia, 10);
     

      const constraseniaHash = bcrypt.hashSync(USR_Contrasenia, "$2b$10$d32mcWs6/PVcPjr2Rulqv."); // Genera el hash utilizando la contraseña y la "sal"
      console.log(UserName+"--"+constraseniaHash); // Imprime el hash generado 
      
      try {
        const existingUser = await db.query('SELECT UserName FROM USUARIO WHERE UserName = ?', [UserName]);
        
        
        if (existingUser.length > 0) {
          res.json({ message: 'El nombre de usuario ya está registrado.' });
          return 0;
        }
        // Paso 1: Insertar el usuario en la tabla USUARIO

        await db.query('INSERT INTO USUARIO (USR_IDENTIFICACION, USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO, USR_Contrasenia, UserName) VALUES (?, ?, ?, ?, ?, ?, ?)', [USR_IDENTIFICACION, USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO, constraseniaHash, UserName ]);
    
        // Paso 2: Insertar el registro en la tabla USEROL con las fechas correspondientes
        await db.query('INSERT INTO USEROL (USR_IDENTIFICACION, ROL_ID, UR_FECHAINICIO, UR_FECHAFIN) VALUES (?, ?, ?, ?)', [USR_IDENTIFICACION, ROL_ID, UR_FECHAINICIO, UR_FECHAFIN]);
    
        res.json({ message: 'Usuario insertado correctamente.' });
        return 1;
      } catch (error) {
        res.status(500).json({ message: 'Error al insertar el usuario.' });
      }
    }
    
   
    
    public async delete(req: Request, res: Response): Promise<void> {
      const { id } = req.params;
      
      try {
        // Paso 1: Eliminar los registros relacionados en la tabla `userol`
        await db.query('DELETE FROM userol WHERE USR_IDENTIFICACION = ?', [id]);
    
        // Paso 2: Eliminar la fila en la tabla `usuario`
        await db.query('DELETE FROM usuario WHERE USR_IDENTIFICACION = ?', [id]);
    
        res.json({ text: 'Usuario eliminado correctamente' });
      } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
      }
    }
    
    public async update(req: Request, res: Response): Promise<void> {
      const { id } = req.params;
      const { USR_IDENTIFICACION, USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO,UserName,USR_Contrasenia, ROL_ID, UR_FECHAINICIO, UR_FECHAFIN } = req.body;
    
      try {
        // Paso 1: Actualizar los datos en la tabla `usuario`
        await db.query('UPDATE usuario SET USU_NOMBRE = ?, USU_APELLIDO = ?, USU_GENERO = ?, USU_ESTUDIO = ?,UserName = ?,USR_Contrasenia = ? WHERE USR_IDENTIFICACION = ?', [USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO,UserName,USR_Contrasenia,  USR_IDENTIFICACION]);
    
        // Paso 2: Actualizar los datos en la tabla `userol`
        await db.query('UPDATE userol SET ROL_ID = ?, UR_FECHAINICIO = ?, UR_FECHAFIN = ? WHERE USR_IDENTIFICACION = ?', [ROL_ID, UR_FECHAINICIO, UR_FECHAFIN, USR_IDENTIFICACION]);
    
        res.json({ text: 'Usuario actualizado correctamente' });
      } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
      }
    }
    
    public async getUserLogin(req: Request, res: Response){
      const { contrasenia,login } = req.params;
       //const constraseniaHash =  await bcrypt.hash(contrasenia, 10);
       //console.log(constraseniaHash);
      

      const constraseniaHash = bcrypt.hashSync(contrasenia, "$2b$10$d32mcWs6/PVcPjr2Rulqv."); // Genera el hash utilizando la contraseña y la "sal"
      console.log("VERIFICAR CONTRAEÑA"+constraseniaHash); // Imprime el hash generado 
       const query = `
          SELECT UR.ROL_ID, U.USR_IDENTIFICACION
          FROM USUARIO U
          INNER JOIN USEROL UR ON U.USR_IDENTIFICACION = UR.USR_IDENTIFICACION
          WHERE U.UserName = ? AND U.USR_Contrasenia = ? AND CURRENT_DATE BETWEEN UR.UR_FECHAINICIO and UR.UR_FECHAFIN;
        `;
        
        try {
          const rows = await db.query(query, [login , constraseniaHash]);
      
          if (rows.length > 0) {
            console.log()
            return res.json((rows[0]));
          }
      
          res.status(404).json({ text: 'Usuario no encontrado' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ text: 'Error al obtener el usuario' });
        }
        
    }
   
    
}

const usuariosController =new UsuariosControllers();
export default usuariosController;

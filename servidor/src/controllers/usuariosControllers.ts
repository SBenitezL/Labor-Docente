import {Request, Response} from 'express';
import db from '../database';
class UsuariosControllers{

    /*public async list(req: Request, res: Response) {
        const usuarios = await db.query('SELECT * FROM USUARIO');  
        res.json(usuarios);
      }*/
      public async list(req: Request, res: Response) {
        const [rows] = await db.query('SELECT * FROM USUARIO'); // Desestructurar el resultado para obtener solo el primer elemento (las filas)
      
        if (Array.isArray(rows)) {
          const usuarios = rows.map((row: any) => row); // Utilizar cualquier tipo genérico para 'row' según tus necesidades
          res.json(usuarios);
        } else {
          console.error('Invalid result format');
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    public async getOne (req: Request,res: Response): Promise<any>{
        const {id} = req.params;
        const usuario= await db.query('SELECT * FROM USUARIO WHERE USR_IDENTIFICACION  = ?',[id]);
        //console.log(usuario);
        if(usuario.length>0){
            return res.json(usuario[0]);
        }
        res.status(404).json({text:'Usuario no encontrado'});

    } 
    public async create(req: Request, res: Response): Promise<void> {
      const { USR_IDENTIFICACION, USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO, UR_FECHAINICIO, UR_FECHAFIN, ROL_ID } = req.body;
    
      try {
        // Paso 1: Insertar el usuario en la tabla USUARIO
        await db.query('INSERT INTO USUARIO (USR_IDENTIFICACION, USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO) VALUES (?, ?, ?, ?, ?)', [USR_IDENTIFICACION, USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO]);
    
        // Paso 2: Insertar el registro en la tabla USEROL con las fechas correspondientes
        await db.query('INSERT INTO USEROL (USR_IDENTIFICACION, ROL_ID, UR_FECHAINICIO, UR_FECHAFIN) VALUES (?, ?, ?, ?)', [USR_IDENTIFICACION, ROL_ID, UR_FECHAINICIO, UR_FECHAFIN]);
    
        res.json({ message: 'Usuario insertado correctamente.' });
      } catch (error) {
        res.status(500).json({ message: 'Error al insertar el usuario.' });
      }
    }
    
    
    public async delete(req: Request,res: Response): Promise<void>{
        const {id} = req.params;
        await db.query('DELETE FROM USUARIO WHERE USR_IDENTIFICACION  = ?',[id]);
        res.json({text : 'Usuario Eliminado'});
    }
    public async update(req: Request, res: Response): Promise<void> {
      const { id } = req.params;
      const { USR_IDENTIFICACION, USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO } = req.body;
      console.log(req.body);
      await db.execute('UPDATE USUARIO SET USU_NOMBRE = ?, USU_APELLIDO = ?, USU_GENERO = ?, USU_ESTUDIO = ? WHERE USR_IDENTIFICACION = ?', [USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO, USR_IDENTIFICACION]);

      res.json({ text: 'Actualizando usuario...' });

    }
    
}

const usuariosController =new UsuariosControllers();
export default usuariosController;

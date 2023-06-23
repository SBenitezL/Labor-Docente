import {Request, Response} from 'express';
import db from '../database';


class DocenteArchivoControllers{
     
    
    public async create(req: Request, res: Response): Promise<void> {
        const { USR_IDENTIFICACION, USU_NOMBRE, USU_APELLIDO, USU_GENERO, USU_ESTUDIO, UR_FECHAINICIO, UR_FECHAFIN, ROL_ID, USR_Contrasenia, UserName } = req.body;
       
        try {
          await db.query('INSERT INTO USEROL (USR_IDENTIFICACION, ROL_ID, UR_FECHAINICIO, UR_FECHAFIN) VALUES (?, ?, ?, ?)', [USR_IDENTIFICACION, ROL_ID, UR_FECHAINICIO, UR_FECHAFIN]);
      
          res.json({ message: 'Archivo insertado correctamente.' });
        } catch (error) {
          res.status(500).json({ message: 'Error al insertar el archivo.' });
        }
      }
   
    
}

const docenteArchivoController =new DocenteArchivoControllers();
export default docenteArchivoController;

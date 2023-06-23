import {Request, Response} from 'express';
import db from '../database';
import multer from 'multer';
class DocenteArchivoControllers{
     
    
    public async create(req: Request, res: Response): Promise<void> {
        const archiv = req.file;
        const { ARC_NOMBRE, ARC_TIPO,  USR_IDENTIFICACION, EVA_ID } = req.body;
        const  ARC_RUTA = archiv?.path;
        try {
            await db.query('INSERT INTO ARCHIVODOCENTE ( ARC_NOMBRE, ARC_TIPO, ARC_RUTA, USR_IDENTIFICACION, EVA_ID) VALUES (?, ?, ?, ?, ?)', [ARC_NOMBRE, ARC_TIPO, ARC_RUTA, USR_IDENTIFICACION, EVA_ID]);
            res.json({ message: 'Archivo insertado correctamente.' });
        } catch (error) {
          res.status(500).json({ message: 'Error al insertar el archivo.' });
        }
      }
   
    
}

const docenteArchivoController =new DocenteArchivoControllers();
export default docenteArchivoController;

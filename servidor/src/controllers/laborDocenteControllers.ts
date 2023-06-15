import {Request, Response} from 'express';
import db from '../database';
class LaborDocenteControllers{
    public async list(req: Request, res: Response) {
        const [rows] = await db.query('SELECT * FROM LABOR'); // Desestructurar el resultado para obtener solo el primer elemento (las filas)
      
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
        const usuario= await db.query('SELECT * FROM LABOR WHERE LAB_ID  = ?',[id]);
        //console.log(usuario);
        if(usuario.length>0){
            return res.json(usuario[0]);
        }
        res.status(404).json({text:'Usuario no encontrado'});

    } 
    public async create(req: Request,res: Response): Promise<void>{
        await db.query('INSERT INTO LABOR SET ?', [req.body]);
        res.json({message: 'Usuario insertado'});
    }
    public async delete(req: Request,res: Response): Promise<void>{
        const {id} = req.params;
        await db.query('DELETE FROM LABOR WHERE LAB_ID = ?',[id]);
        res.json({text : 'Usuario Eliminado'});
    }
    public async update(req: Request,res: Response): Promise<void>{
        const {id} = req.params;
        await db.query('UPDATE LABOR set ? WHERE LAB_ID  = ?',[req.body,id]);
        res.json({text : 'Actualizando usuario...'});
    }
}
const laborDocenteController =new LaborDocenteControllers();
export default laborDocenteController;
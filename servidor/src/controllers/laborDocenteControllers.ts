import {Request, Response} from 'express';
import db from '../database';
class LaborDocenteControllers{
    public async list(req: Request, res: Response) {
        const [rows] = await db.query('SELECT * FROM LABOR'); // Desestructurar el resultado para obtener solo el primer elemento (las filas)
      
        if (Array.isArray(rows)) {
          const laborD = rows.map((row: any) => row); // Utilizar cualquier tipo genérico para 'row' según tus necesidades
          res.json(laborD);
        } else {
          console.error('Invalid result format');
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const query = 'SELECT * FROM LABOR WHERE LAB_ID = ?';
      
        try {
            const [rows] = await db.query(query, [id]);
        
            if (Array.isArray(rows) && rows.length > 0) {
              const laborDocente = rows[0];
              return res.json(laborDocente);
            }
        
            res.status(404).json({ text: 'Labor no encontrado aca' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ text: 'Error al obtener la labor' });
          }
     
      }
    public async create(req: Request,res: Response): Promise<void>{
        await db.query('INSERT INTO LABOR SET ?', [req.body]);
        res.json({message: 'Labor docente insertada'});
    }
    public async delete(req: Request,res: Response): Promise<void>{
        const {id} = req.params;
        await db.query('DELETE FROM EVALUACION WHERE LAB_ID = ?',[id]);
        await db.query('DELETE FROM LABOR WHERE LAB_ID = ?',[id]);
        res.json({text : 'Labor docente Eliminada'});
    }
    public async update(req: Request,res: Response): Promise<void>{
        const {id} = req.params;
        await db.query('UPDATE LABOR set ? WHERE LAB_ID  = ?',[req.body,id]);
        res.json({text : 'Actualizando labor docente...'});
    }
    public async getToAdd(req: Request,res: Response): Promise<void>{
        const rows:any = await db.query('SELECT LAB_ID, LAB_NOMBRE FROM labor');
        res.json(rows[0]);
    }

}
const laborDocenteController =new LaborDocenteControllers();
export default laborDocenteController;
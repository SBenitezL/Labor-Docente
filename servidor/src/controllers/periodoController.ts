import {Request, Response} from 'express';
import db from '../database';

class PeriodoController{

    
    public async getToAdd(req: Request,res: Response): Promise<void>{
        const rows:any = await db.query('CALL sp_consultar_periodos()');
        res.json(rows[0][0]);
    }
}

const periodoController = new PeriodoController();

export default periodoController;

import {Request, Response} from 'express';
import db from '../database';

class PeriodoController{

    public async insert(req:Request,res:Response):Promise<void>{
        const query = "CALL sp_insertar_periodo(?,?,?)";
        const {PER_NOMBRE, PER_FECHAINICIO, PER_FECHAFIN} = req.body;
        await db.query(query, [PER_FECHAINICIO,PER_FECHAFIN,PER_NOMBRE]);
        res.json({message: "Insertando ..."});
    }
    public async getToAdd(req: Request,res: Response): Promise<void>{
        const rows:any = await db.query('CALL sp_consultar_periodos()');
        res.json(rows[0][0]);
    }
}

const periodoController = new PeriodoController();

export default periodoController;

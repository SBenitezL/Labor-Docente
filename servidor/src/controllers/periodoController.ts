import {Request, Response, query} from 'express';

import db from '../database';

class PeriodoController{

    public async insert(req:Request,res:Response):Promise<void>{
        const query = "CALL sp_insertar_periodo(?,?,?)";
        const {PER_NOMBRE, PER_FECHAINICIO, PER_FECHAFIN} = req.body;
        const result:any = await db.query(query, [PER_FECHAINICIO,PER_FECHAFIN,PER_NOMBRE]);
        if(result[0].affectedRows > 0)
            res.json({message: "Se agregó correctamente."});
        else
            res.json({message:"No se logró agregar."});
    }
    public async getToAdd(req: Request,res: Response): Promise<void>{
        const rows:any = await db.query('CALL sp_consultar_periodos()');
        res.json(rows[0][0]);
    }
    public async getAll(req:Request, res:Response):Promise<void>{
        const rows:any = await db.query('CALL sp_consultar_periodos_list()');
        res.json(rows[0][0]);
    }
    public async getToEdit(req:Request, res:Response)
    {
        const {id} = req.params;
        const row:any = await db.query("CALL sp_consultar_periodos_edit(?)",[id]);
        res.json(row[0][0]);
    }
    public async editPeriodo(req:Request, res:Response):Promise<void>{
        const query = "CALL sp_editar_periodo(?,?,?,?)";
        const {PER_ID, PER_NOMBRE, PER_FECHAINICIO, PER_FECHAFIN} = req.body;
        const result:any = await db.query(query,[PER_ID, PER_NOMBRE, PER_FECHAINICIO, PER_FECHAFIN]);
        if(result[0].affectedRows > 0)
            res.json({message: "Se actualizó correctamente.", icon:"info"});
        else
            res.json({message:"No se logró actualizar.", icon: "error"});
    }
    public async eliminar(req:Request, res:Response){
        const query = "CALL sp_eliminar_periodo(?)"
        const {id} = req.params;
        const resultado:any = await db.query(query,[id]);
        if(resultado.affectedRows>0)
            res.json({message:"Se eliminó correctamente"});
        else
            res.json({message: "No se pudo eliminar."})
    }
}

const periodoController = new PeriodoController();

export default periodoController;

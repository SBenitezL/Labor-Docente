import {Request, Response} from 'express';
import db from '../database';
import { RowDataPacket } from 'mysql2';

class EvaluacionController{
    public async list(req:Request,res:Response):Promise<void>{
        const query = "CALL sp_consultar_evaluaciones()";
        let evaluaciones:any = await db.query(query);
        res.json(evaluaciones[0][0]);
    }
    public async getToOne(req:Request,res:Response):Promise<void>
    {
        const query = "CALL sp_consultar_evaluacion(?,?)";
        const {id,per_id} = req.params;
        const evaluaciones:any = (await db.query(query,id));
        res.json(evaluaciones[0][0]);
    }
    public async create(req:Request,res:Response): Promise<void>{
        const query = "CALL sp_insert_evaluacion(?,?,?,?,?)";
        const {LAB_ID,PER_ID,USR_IDENTIFICACION,ROL_ID,EVA_ESTADO} = req.body;
        await db.query(query, [LAB_ID,PER_ID,USR_IDENTIFICACION,ROL_ID,EVA_ESTADO]);
        res.json({text: "Creando evaluacion..."});
    }
    public async delete(req:Request, res:Response):Promise<void>{
        const query = "CALL sp_eliminar_evaluacion(?)";
        const {id} = req.params;
        const evaluaciones:any = (await db.query(query,id));
        if(evaluaciones[0].affectedRows > 0){
            res.json({message : "La evaluacion fue eliminada"});
        }else{
            res.json({message : "La evaluacion no se pudo eliminar"});
        }
        
    }
    public async update (req:Request, res:Response):Promise<void>
    {
        const {id} = req.params;
        const query = "CALL sp_actualizar_evaluacion_coordinador (?,?,?,?,?,?);";
        const {LAB_ID,PER_ID,USR_IDENTIFICACION,ROL_ID, EVA_ESTADO} = req.body;
        const evaluaciones:any = await db.query(query, [id,LAB_ID,PER_ID,USR_IDENTIFICACION,ROL_ID, EVA_ESTADO]);
        if(evaluaciones[0].affectedRows > 0){
            res.json({message : "La evaluacion fue actualizada"});
        }else{
            res.json({message : "La evaluacion no se pudo actualizar"});
        }

    }
    public async getToEdit(req:Request, res: Response){
        const {id} = req.params;
        const query = "CALL consultar_evaluacion_edit (?);";
        const evaluacion:any = await db.query(query,id);
        res.json(evaluacion[0][0]);
    }
}
const evaluacionController = new EvaluacionController();

export default evaluacionController;
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
        const query = "CALL sp_consultar_evaluacion(?)";
        const {id} = req.params;
        const evaluaciones:any = (await db.query(query,id));
        res.json(evaluaciones[0][0]);
    }
    public async create(req:Request,res:Response): Promise<void>{
        const query = "CALL sp_insert_evaluacion(?,?,?,?,?)";
        const {LAB_ID,PER_ID,USR_IDENTIFICACION,ROL_ID,EVA_ESTADO} = req.body;
        await db.query(query, [LAB_ID,PER_ID,USR_IDENTIFICACION,ROL_ID,EVA_ESTADO]);
        res.json({text: "Creando evaluacion..."});
    }
    public async updateOwn(req:Request,res:Response){
      const query = "CALL sp_ingresar_values(?,?,?)"
      const {EVA_ID, EVA_PUNTAJE, EVA_RESULTADO} = req.body;
      const result:any= await db.query(query,[ EVA_PUNTAJE, EVA_RESULTADO,EVA_ID]);
      console.log("ingreso servidor update docente eva")
      if(result[0].affectedRows > 0)
      {
        res.json({message: "Se actualizó correctamente"});
      }else{
        res.json({message: "No se pudo actualizar|"});
      }
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
    
    public async getToNotify(req:Request, res: Response) {
    const query = "CALL sp_get_to_notificar()";
    const query2 = "CALL sp_get_administradores()";
    const query3 = "CALL sp_insert_notificacion(?,?)";
    console.log("entra");
    try {
      const evaluaciones: any = await db.query(query);
      const rows = evaluaciones[0][0];
      console.log(rows);
      let msg: string;
  
      if (rows.length > 0) {
        const admins: any = await db.query(query2);
        const rowsAdmins = admins[0][0];
        console.log(rowsAdmins);
        for (let i = 0; i < rows.length; i++) {
          msg = `La evaluacion ${rows[i].LAB_NOMBRE} del usuario ${rows[i].USU_NOMBRE} sigue en ${rows[i].EVA_ESTADO == 1 ? "ejecucion" : "suspendido"} y se encuentra próxima a finalizar el tiempo establecido`;
            console.log(msg);
          for (let j = 0; j < rowsAdmins.length; j++) {
            console.log(rowsAdmins[j].USR_IDENTIFICACION);
            await db.query(query3, [rowsAdmins[j].USR_IDENTIFICACION, msg]);
          }
        }
      }
      res.json({message:"Se realizo el proceso"});
    } catch (error) {
      res.json({mesagge:'Error al obtener y notificar:'});
    }
  }

    
}
const evaluacionController = new EvaluacionController();

export default evaluacionController;
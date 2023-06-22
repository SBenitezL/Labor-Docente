import {Request, Response} from 'express';
import db from '../database';

export class NotificacionController{
    public async getNotificaciones(req:Request, res:Response)
    {
        const query = "CALL sp_getnotificaciones(?)";
        const {id} = req.params;
        const notificaciones = await db.query(query,[id]);
        console.log(notificaciones);
        res.json({message: "Realizado"});
    }
}
const notificacionController = new NotificacionController();
export default notificacionController;
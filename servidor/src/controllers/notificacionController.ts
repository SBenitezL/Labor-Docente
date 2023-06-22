import {Request, Response} from 'express';
import db from '../database';

export class NotificacionController{
    public async getNotificaciones(req:Request, res:Response)
    {
        const query = "CALL sp_get_notificaciones(?)";
        const {id} = req.params;
        const notificaciones:any = await db.query(query,[id]);
        const rows = notificaciones[0][0];
        res.json(rows);        
    }
}
const notificacionController = new NotificacionController();
export default notificacionController;
import {Router} from 'express';
import notificacionController from '../controllers/notificacionController';

class NotificacionRoutes{
    public router:Router = Router();

    constructor()
    {
        this.config();
    }
    public config():void{
        
        this.router.get('/:id',notificacionController.getNotificaciones);
    }
}
const notificacionRoutes = new NotificacionRoutes();
export default notificacionRoutes.router;
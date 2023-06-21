import { Router } from "express";
import periodoController from "../controllers/periodoController";
class PeriodoRoutes{
    public router:Router = Router();
    
    constructor()
    {
        this.config();
    }
    public config():void{
        
        this.router.get('/',periodoController.getToAdd);
    }
}

const periodoRoutes = new PeriodoRoutes();
export default periodoRoutes.router;
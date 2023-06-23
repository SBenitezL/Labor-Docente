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
        this.router.get('/:id',periodoController.getToEdit);
        this.router.post('/add',periodoController.insert);
        this.router.get('/to/list',periodoController.getAll);
        this.router.post('/edit',periodoController.editPeriodo);
    }
}

const periodoRoutes = new PeriodoRoutes();
export default periodoRoutes.router;
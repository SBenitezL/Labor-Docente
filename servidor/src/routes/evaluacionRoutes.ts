import { Router } from "express";
import evaluacionController  from '../controllers/evaluacionController';

class EvaluacionRoutes {
    public router:Router = Router();
    
    constructor()
    {
        this.config();
    }
    public config():void{
        this.router.get('/',evaluacionController.list);
        this.router.get('/:id',evaluacionController.getToOne);
        this.router.post('/', evaluacionController.create);
        this.router.put("/update/:id", evaluacionController.update);
        this.router.delete("/:id", evaluacionController.delete);
        this.router.get("/edit/:id",evaluacionController.getToEdit);
        this.router.get("/notificar/funcion",evaluacionController.getToNotify);
        this.router.post("/update/own",evaluacionController.updateOwn);
    }
}

const evaluacionRoutes = new EvaluacionRoutes();
export default evaluacionRoutes.router;
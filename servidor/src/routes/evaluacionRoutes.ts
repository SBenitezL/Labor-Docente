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
        this.router.get('/:id/:per_id',evaluacionController.getToOne);
        this.router.post('/', evaluacionController.create);
        this.router.put("/update/:id", evaluacionController.update);
        this.router.delete("/:id", evaluacionController.delete);
        this.router.get("/edit/:id",evaluacionController.getToEdit);
    }
}

const evaluacionRoutes = new EvaluacionRoutes();
export default evaluacionRoutes.router;
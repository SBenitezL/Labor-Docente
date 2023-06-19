import {Router} from 'express';
import  laborDocenteControllers from '../controllers/laborDocenteControllers';

class LaborRoutes{
    public router:Router= Router();

    constructor(){
        this.config();

    }
    config():void{

       
        this.router.get('/',laborDocenteControllers.list);
        this.router.get('/:id', laborDocenteControllers.getOne);
        this.router.post('/', laborDocenteControllers.create);
        this.router.put('/:id', laborDocenteControllers.update );
        this.router.delete('/:id',laborDocenteControllers.delete);
        this.router.get('/ToAdd',laborDocenteControllers.getToAdd);

    }
}
const laborRoutesRoutes=new LaborRoutes();
export default laborRoutesRoutes.router; 
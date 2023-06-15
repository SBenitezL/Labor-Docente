import {Router} from 'express';
import  usuariosControllers from '../controllers/usuariosControllers'; 

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

    }
}
const laborRoutesRoutes=new LaborRoutes();
export default laborRoutesRoutes.router; 
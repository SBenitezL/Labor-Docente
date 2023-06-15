import {Router} from 'express';
import  usuariosControllers from '../controllers/usuariosControllers'; 

class LaborRoutes{
    public router:Router= Router();

    constructor(){
        this.config();

    }
    config():void{

       
        this.router.get('/',laborDocenteController.list);
        this.router.get('/:id', laborDocenteController.getOne);
        this.router.post('/', laborDocenteController.create);
        this.router.put('/:id', laborDocenteController.update );
        this.router.delete('/:id',laborDocenteController.delete);

    }
}
const laborRoutesRoutes=new LaborRoutes();
export default laborRoutesRoutes.router; 
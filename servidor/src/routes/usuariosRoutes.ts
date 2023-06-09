import {Router} from 'express';
import  usuariosControllers from '../controllers/usuariosControllers'; 

class UsuariosRoutes{
    public router:Router= Router();

    constructor(){
        this.config();

    }
    config():void{

       
        this.router.get('/',usuariosControllers.list);
        this.router.get('/:id', usuariosControllers.getOne);
        this.router.post('/', usuariosControllers.create);
        this.router.put('/:id', usuariosControllers.update );
        this.router.delete('/:id',usuariosControllers.delete);

    }
}
const usuariosRoutes=new UsuariosRoutes();
export default usuariosRoutes.router;
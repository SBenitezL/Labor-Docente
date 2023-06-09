import {Router} from 'express';
import  usuariosControllers from '../controllers/usuariosControllers'; 

class UsuariosRoutes{
    public router:Router= Router();

    constructor(){
        this.config();

    }
    config():void{
        this.router.get('/',usuariosControllers.list);
        this.router.get('/',usuariosControllers.getOne);
        this.router.post('/',usuariosControllers.create);
        this.router.delete('/:id',usuariosControllers.delete);
        this.router.put('/:id',usuariosControllers.update);

    }
}
const usuariosRoutes=new UsuariosRoutes();
export default usuariosRoutes.router;
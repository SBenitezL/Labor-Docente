import {Router} from 'express';
import  usuariosControllers from '../controllers/usuariosControllers'; 

class UsuariosRoutes{
    public router:Router= Router();

    constructor(){
        this.config();

    }
    config():void{
        this.router.get('/',usuariosControllers.index);
    }
}
const usuariosRoutes=new UsuariosRoutes();
export default usuariosRoutes.router;
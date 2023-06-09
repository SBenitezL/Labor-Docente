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
        this.router.get('/getRol/:rol', usuariosControllers.getRol);
        this.router.post('/', usuariosControllers.create);
        this.router.put('/:id', usuariosControllers.update );
        this.router.delete('/:id',usuariosControllers.delete);
        this.router.get('/:contrasenia/:login',usuariosControllers.getUserLogin);

    }
}
const usuariosRoutes=new UsuariosRoutes();
export default usuariosRoutes.router;
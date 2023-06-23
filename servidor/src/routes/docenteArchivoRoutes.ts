import {Router} from 'express';
import  docenteArchivoController from '../controllers/docenteArchivoController'; 

class DocenteArchivoRoutes{
    public router:Router= Router();

    constructor(){
        this.config();

    }
    config():void{

        this.router.post('/guardarArchivo', docenteArchivoController.create);

    }
}
const docenteArchivoRoutes=new DocenteArchivoRoutes();
export default docenteArchivoRoutes.router;
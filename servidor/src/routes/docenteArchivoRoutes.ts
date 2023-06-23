import {Router} from 'express';
import  docenteArchivoController from '../controllers/docenteArchivoController'; 
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Nombre del archivo original
    }
  });
  
  const upload = multer({ storage: storage });
class DocenteArchivoRoutes{
    public router:Router= Router();

    constructor(){
        this.config();

    }
    config():void{

        this.router.post('/guardarArchivo',upload.single('archivo'), docenteArchivoController.create);

    }
}
const docenteArchivoRoutes=new DocenteArchivoRoutes();
export default docenteArchivoRoutes.router;
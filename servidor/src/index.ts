import express,{ Application } from "express";
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import laborRoutes from './routes/LaborDocenteRoutes';
import evaluacionRoutes from "./routes/evaluacionRoutes";
import periodoRoutes from "./routes/periodoRoutes";
import userrolRoutes from "./routes/userrolRoutes";
import notificacionRoutes from "./routes/notificacionRoutes";
import multer from 'multer';
class Servidor{
    public app: Application;
    constructor(){
       this.app= express();
       this.config();
       this.routes();
    }
    config():void{
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());//entender los formatos json
        this.app.use(express.urlencoded({extended: false}));//enviar desde formulario html
    }
    routes():void{
        this.app.use(indexRoutes);
        this.app.use('/api/usuarios',usuariosRoutes);
        this.app.use('/api/labor',laborRoutes);
        this.app.use('/api/evaluacion',evaluacionRoutes);
        this.app.use('/api/periodo',periodoRoutes);
        this.app.use('/api/userol',userrolRoutes);
        this.app.use('/api/notificacion',notificacionRoutes);        
    }
    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('Servidor en puerto', this.app.get('port'));
        });
    }
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname); // Nombre del archivo original
        }
      });

}
const server=new Servidor();
server.start();
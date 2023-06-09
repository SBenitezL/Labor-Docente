"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const LaborDocenteRoutes_1 = __importDefault(require("./routes/LaborDocenteRoutes"));
const evaluacionRoutes_1 = __importDefault(require("./routes/evaluacionRoutes"));
const periodoRoutes_1 = __importDefault(require("./routes/periodoRoutes"));
const userrolRoutes_1 = __importDefault(require("./routes/userrolRoutes"));
const notificacionRoutes_1 = __importDefault(require("./routes/notificacionRoutes"));
const docenteArchivoRoutes_1 = __importDefault(require("./routes/docenteArchivoRoutes"));
const multer_1 = __importDefault(require("multer"));
class Servidor {
    constructor() {
        this.storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname); // Nombre del archivo original
            }
        });
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json()); //entender los formatos json
        this.app.use(express_1.default.urlencoded({ extended: false })); //enviar desde formulario html
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/labor', LaborDocenteRoutes_1.default);
        this.app.use('/api/evaluacion', evaluacionRoutes_1.default);
        this.app.use('/api/periodo', periodoRoutes_1.default);
        this.app.use('/api/userol', userrolRoutes_1.default);
        this.app.use('/api/notificacion', notificacionRoutes_1.default);
        this.app.use('/api', docenteArchivoRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor en puerto', this.app.get('port'));
        });
    }
}
const server = new Servidor();
server.start();

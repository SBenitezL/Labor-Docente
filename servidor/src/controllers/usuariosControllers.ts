import {Request, Response} from 'express';
import db from '../database';

class UsuariosController{
    index (req: Request,res: Response){
        db.query('DESCRIBE USUARIO ');
        res.json('USUARIO')
    }
}

const usuariosController =new UsuariosController();
export default usuariosController;
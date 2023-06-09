import {Request, Response} from 'express';
import db from '../database';

class UsuariosController{
    public list (req: Request,res: Response){
        res.json({text : 'Listando usuario'});

    }
    public getOne (req: Request,res: Response){
        res.json({text : 'Usuario'+ req.params.id});

    }
    public async create(req: Request,res: Response){
        await db.query('INSERT INTO USUARIO set ?', [req.body]);
        res.json({message : 'Usuario insertado'});
    }
    public  delete(req: Request,res: Response){
        res.json({text : 'Eliminando usuario'});
    }
    public  update(req: Request,res: Response){
        res.json({text : 'Actualizando usuario'});
    }
}

const usuariosController =new UsuariosController();
export default usuariosController;
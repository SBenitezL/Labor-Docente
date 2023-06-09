import {Request, Response} from 'express';
import db from '../database';

class UsuariosControllers{
     
    public async list (req: Request,res: Response){
        const usuarios= await db.query('SELECT * FROM USUARIO');
        res.json(usuarios);

    }
    public async getOne (req: Request,res: Response){
        const {id} = req.params;
        const usuario= await db.query('SELECT * FROM USUARIO WHERE USR_IDENTIFICACION  = ?',[id]);
        console.log(usuario);
        res.json({text:'Usuario encontrado'});

    }
    public async create(req: Request,res: Response){
        await db.query('INSERT INTO USUARIO SET ?', [req.body]);
        res.json({message: 'Usuario insertado'});
    }
    public delete(req: Request,res: Response){
        res.json({text : 'Eliminando usuario'});
    }
    public  update(req: Request,res: Response){
        res.json({text : 'Actualizando usuario'+req.params.id});
    }
}

const usuariosController =new UsuariosControllers();
export default usuariosController;
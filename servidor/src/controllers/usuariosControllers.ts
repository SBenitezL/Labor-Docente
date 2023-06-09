import {Request, Response} from 'express';
import db from '../database';

class UsuariosController{
    public index (req: Request,res: Response){
        db.query('Describe usuarios')
        res.json('Usuarios');

    }
    /*
   public getOne (req: Request,res: Response){
        res.json({text : 'Usuario'+ req.params.id});

    }*/
    /*public async create(req: Request,res: Response){
        await db.query('INSERT INTO USUARIO set ?', [req.body]);
        res.json({message : 'Usuario insertado'});
    }*/
    public async create(req: Request, res: Response): Promise<void> {
        try {
          const result = await db.query('INSERT INTO USUARIO SET ?', [req.body]);
          res.json({ message: 'Usuario insertado' });
        } catch (error) {
          console.error('Error al insertar usuario:', error);
          res.status(500).json({ message: 'Error al insertar usuario' });
        }
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
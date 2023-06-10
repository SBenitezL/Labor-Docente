import {Request, Response} from 'express';
import db from '../database';
class UsuariosControllers{
     
    public async list (req: Request,res: Response){
        
        const usuarios= (await db.query('SELECT * FROM USUARIO')).map((row: any) => ({
        USR_IDENTIFICACION: row.USR_IDENTIFICACION,
        USU_NOMBRE: row.USU_NOMBRE.toString(),
        // Agrega otras propiedades según la estructura de tu tabla
      }));
     
        res.json(usuarios);

    }
    public async getOne (req: Request,res: Response): Promise<any>{
        const {id} = req.params;
        const usuario= await db.query('SELECT * FROM USUARIO WHERE USR_IDENTIFICACION  = ?',[id]);
        //console.log(usuario);
        if(usuario.length>0){
            return res.json(usuario[0]);
        }
        res.status(404).json({text:'Usuario no encontrado'});

    }
    public async create(req: Request,res: Response): Promise<void>{
        await db.query('INSERT INTO USUARIO SET ?', [req.body]);
        res.json({message: 'Usuario insertado'});
    }
    public async delete(req: Request,res: Response): Promise<void>{
        const {id} = req.params;
        await db.query('DELETE FROM USUARIO WHERE USR_IDENTIFICACION  = ?',[id]);
        res.json({text : 'Usuario Eliminado'});
    }
    public async update(req: Request,res: Response): Promise<void>{
        const {id} = req.params;
        await db.query('UPDATE USUARIO set ? WHERE USR_IDENTIFICACION  = ?',[req.body,id]);
        res.json({text : 'Actualizando usuario...'});
    }
}

const usuariosController =new UsuariosControllers();
export default usuariosController;

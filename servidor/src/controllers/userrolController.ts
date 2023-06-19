import {Request, Response} from 'express';
import db from '../database';

class UserrolController{

    public async getToAdd(req:Request, res:Response):Promise<void>{
        const rows:any = await db.query(`

        SELECT 
            CONCAT(usuario.USU_NOMBRE, ' ' , usuario.USU_APELLIDO) as Nombre, 
            rol.ROL_DESCRIPCION as Rol, 
            userol.USR_IDENTIFICACION as Id, 
            userol.ROL_ID as RolID
        from
            userol INNER JOIN usuario ON userol.USR_IDENTIFICACION = usuario.USR_IDENTIFICACION
            INNER JOIN rol ON userol.ROL_ID = rol.ROL_ID
        where CURRENT_DATE BETWEEN userol.UR_FECHAINICIO and userol.UR_FECHAFIN;`);
        res.json(rows[0][0]);
    }

}

const userrolController = new UserrolController();

export default userrolController;

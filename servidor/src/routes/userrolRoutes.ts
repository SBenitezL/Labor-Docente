import { Router } from "express";
import periodoController from "../controllers/periodoController";
class UserrolRoutes{
    public router:Router = Router();
    
    constructor()
    {
        this.config();
    }
    public config():void{
        
        this.router.get('/ToAdd',periodoController.getToAdd);
    }
}

const userrolRoutes = new UserrolRoutes();
export default userrolRoutes.router;
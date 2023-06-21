import { Router } from "express";
import userrolController from "../controllers/userrolController";
class UserrolRoutes{
    public router:Router = Router();
    
    constructor()
    {
        this.config();
    }
    public config():void{
        
        this.router.get('/',userrolController.getToAdd);
    }
}

const userrolRoutes = new UserrolRoutes();
export default userrolRoutes.router;
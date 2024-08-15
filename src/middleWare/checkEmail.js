import { User } from "../../database/model/user.model.js";
import { AppError } from "./AppError.js";
import { catchError } from "./catchError.js";



export const checkEmailExists =catchError(async(req,res,next)=>{
    const emailExists = await User.findOne({email:req.body.email});
    if(emailExists) return next(new AppError("Email Aleardy Exists",409))
        next()
})
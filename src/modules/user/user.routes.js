import { Router } from "express";
import { protectedRoutes, referTo } from "../authentication/auth.controller.js";
import { addUser, deleteeUser, getAllUser, getSpacificUser, updateUser } from "./user.controller.js";
import { checkEmailExists } from "../../middleWare/checkEmail.js";



const userRouter= Router();
userRouter.use(protectedRoutes,referTo('admin')) 

userRouter.post('/adduser',checkEmailExists,addUser)
userRouter.get('/getalluser',getAllUser)
userRouter.get('/getspecificuser/:id',getSpacificUser)
userRouter.put('/updateuser/:id',updateUser)
userRouter.delete('/deleteuser/:id',deleteeUser)

export default userRouter
import { Router } from "express";
import {  changePassword, signIn, signUp } from "./auth.controller.js";
import { validate } from "../../middleWare/validate.js";
import { changePasswordval, signInVal, signUpVal } from "./auth.validation.js";
import { checkEmailExists } from "../../middleWare/checkEmail.js";




const authRouter = Router();
authRouter.post('/signup' ,validate(signUpVal),checkEmailExists,signUp)
authRouter.post('/signin' ,validate(signInVal),signIn)
authRouter.patch('/changepassword',validate(changePasswordval),changePassword)


export default authRouter
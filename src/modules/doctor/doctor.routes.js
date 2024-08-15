import { Router } from "express";
import { protectedRoutes, referTo } from "../authentication/auth.controller.js";
import { addInfoToDcotor, deleteDoctor, findAllDoctor, findDoctor, updateDoctor } from "./doctor.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";





const doctorRouter = Router();

doctorRouter.post('/add-information-doctor',protectedRoutes , referTo('doctor'),
                uploadSingleFile('image','doctors'),addInfoToDcotor)

doctorRouter.get('/',protectedRoutes , referTo('doctor'),findDoctor)

doctorRouter.get('/allDoctor',findAllDoctor)

doctorRouter.put('/update',protectedRoutes , referTo('doctor'),uploadSingleFile('image','doctors'),updateDoctor)

doctorRouter.delete('/delete',protectedRoutes , referTo('doctor'),uploadSingleFile('image','doctors'),deleteDoctor)


export default doctorRouter
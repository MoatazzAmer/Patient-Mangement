import { Router } from "express";
import { protectedRoutes, referTo } from "../authentication/auth.controller.js";
import { addPatientInfo, deletePatient, getAllPatient, getSpecificPAtient, updatePatient } from "./patient.controller.js";
import { validate } from "../../middleWare/validate.js";
import { patientVal } from "./patient.validation.js";



const patientRouter = Router();

patientRouter.post('/infopatient',protectedRoutes,referTo('patient'),validate(patientVal),addPatientInfo)
patientRouter.get('/',protectedRoutes,referTo('patient'),getSpecificPAtient)
patientRouter.get('/allpatient',getAllPatient);
patientRouter.put('/update',protectedRoutes,referTo('patient'),updatePatient);
patientRouter.delete('/delete',protectedRoutes,referTo('patient'),deletePatient);



export default patientRouter;
import { Router } from "express";
import { addAppiontment, deleteAppiotment, getAppointments, updateAppiotment } from "./appiontment.controller.js";
import { protectedRoutes, referTo } from "../authentication/auth.controller.js";



const appiontmentRouter = Router();


appiontmentRouter.post('/',protectedRoutes,referTo('patient','admin'),addAppiontment);
appiontmentRouter.get('/get',protectedRoutes,referTo('admin'),getAppointments);
appiontmentRouter.put('/:id',protectedRoutes,referTo('admin','patient'),updateAppiotment)
appiontmentRouter.delete('/:id',protectedRoutes , referTo('patient' , 'admin'),deleteAppiotment)







export default appiontmentRouter
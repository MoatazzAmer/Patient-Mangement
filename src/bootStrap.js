import appiontmentRouter from "./modules/appiontment/appiontment.routes.js";
import authRouter from "./modules/authentication/auth.routes.js"
import doctorRouter from "./modules/doctor/doctor.routes.js";
import patientRouter from "./modules/patient/patient.routes.js";
import userRouter from "./modules/user/user.routes.js"


export const bootStrap = (app)=>{
    
    app.use('/api/auth',authRouter);
    app.use('/api/user',userRouter);
    app.use('/api/doctor',doctorRouter);
    app.use('/api/patient', patientRouter);
    app.use('/api/appiontment',appiontmentRouter);
}
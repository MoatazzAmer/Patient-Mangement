import { DateTime } from "luxon";
import { Doctor } from "../../../database/model/doctor.model.js";
import { AppError } from "../../middleWare/AppError.js";
import { catchError } from "../../middleWare/catchError.js";
import { Appiontment } from "../../../database/model/appiontment.model.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

const addAppiontment = catchError(async(req,res,next)=>{ 
    // check if patient is unique in all doctor appointments
    // check if patient is unique in doctor appointment array
    const patientPresent = await Doctor.find();
    const newPatient = patientPresent.some((ele) => {
    return ele.appiontments.some((ele2) => {
        return ele2.patient == req.body.patient;
    });
    });
      // setting dates date
    const fromDate = DateTime.fromISO(req.body.from);
    const toDate = DateTime.fromISO(req.body.to);
    const dateNow = DateTime.now();

    // if there is no conflict switch to add appointment
    if (!newPatient || newPatient.length === 0) {
    // check the from and to date
        if (fromDate <= dateNow || toDate <= dateNow || fromDate > toDate)
            return next(new AppError("you can not reserve this date", 409));
    // push appointment to doctor appointments
        await Doctor.findByIdAndUpdate(req.body.doctor, {
            $push: { appiontments: req.body },
        });
    // add appointment
        const appointment = new Appiontment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } else {
    return next(new AppError("you already have an appointment", 409));
    }
});


// get doctors
const getAppointments = catchError(async (req, res, next) => {
        // ------------------------------------
        if(req.query.search){
            let mongooseQuery=mongooseQuery.find({status : {$regex: req.query.search , $options :'i'}})
        }
    //--------------------------
    const dateNow = DateTime.now();
    // remove dates that expired
    const appointments = await Appiontment.updateMany(
        { to: { $lt: dateNow } },
        {
        $set: {
            from: undefined,
            to: undefined,
            status: "completed",
        },
        }
    );
    // let appointment = await Appiontment.find();
    let apiFeature = new ApiFeatures(Appiontment.find(),req.query)
    .pagination().filter().sort().fields();
    const appiotment = await apiFeature.mongooseQuery
    let totalAppiotment = Appiontment.countDocuments();

    res.status(201).json({message:'Success',totalAppiotment,page:apiFeature.pageNumber ,appiotment});
});


const updateAppiotment = catchError(async(req,res,next)=>{
    // get Doctor And Check if he found or not 
    const doctor = await Doctor.findById(req.body.doctor);
    if(!doctor) return next(new AppError('Doctor Not Found',409));

    const fromDate = DateTime.fromISO(req.body.from);
    const toDate = DateTime.fromISO(req.body.to);
    const dateNow = DateTime.now();
    //check date with ISO
    if (fromDate <= dateNow || toDate <= dateNow || fromDate > toDate)
        return next(new AppError("you can not reserve this date", 409));
    // get Appiotment with Doctor
    const checkAppointment = await Appiontment.findOne({
        doctor: req.body.doctor,
        _id: req.params.id ,
        ...req.body
        });
        // check appiontment if Found or not
        if (checkAppointment) {
            return next(new AppError('Time already scheduled. Please choose another time', 409));
        }
        // update Appiotment
    const updateAppiotment =await Appiontment.findByIdAndUpdate(req.params.id , req.body , {new:true});
    updateAppiotment || next(new AppError('Appiotment Not Found',401))
    !updateAppiotment || res.status(201).json({message:"Success Updated ...",updateAppiotment})
})

const deleteAppiotment = catchError(async(req,res,next)=>{
    const appiontment = await Appiontment.findByIdAndDelete(req.params.id);
    res.status(201).json({message:'Success Deleted Appiotment',appiontment})
})
export{
    addAppiontment ,getAppointments,updateAppiotment,deleteAppiotment
}
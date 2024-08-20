import { Patient } from "../../../database/model/patient.model.js";
import { User } from "../../../database/model/user.model.js";
import { AppError } from "../../middleWare/AppError.js";
import { catchError } from "../../middleWare/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";



const addPatientInfo = catchError(async(req,res,next)=>{
    // find User FirstName and lastName 
    const user = await User.findOne({user: req.user.userId});
    if(!user) return next(new AppError("user not found",409))
    // concat firstName+lasstName = fullName
    req.body.fullName = `${user.firstName} ${user.lastName}`
    // add Info Patient To datebase And Save 
    const patient = new Patient({
        user : req.user._id,
        ...req.body
    });
    await patient.save()
    res.status(201).json({message:"Success Add Info Patient",patient})
})


const getSpecificPAtient = catchError(async(req,res,next)=>{
    // find patient with populate user
        const patient = await Patient.findOne({user:req.user._id}).populate('user');
        if(!patient) return next(new AppError('patient Not Found',409))
        patient.user.password = undefined;
        patient.user.email = undefined;
    
        res.status(201).json({message :"Success get spcific patient", patient})
})

const getAllPatient = catchError(async(req,res,next)=>{

    let apiFeature =new ApiFeatures(Patient.find(),req.query)
    .pagination().filter().sort().fields().search()
    const patients = await apiFeature.mongooseQuery

    let totalPatient = await Patient.countDocuments()

    res.status(201).json({message :"Success Get All Doctor",totalPatient,page:apiFeature.pageNumber, patients})
});

const updatePatient = catchError(async(req,res,next)=>{
    // find patient and update
    const patient = await Patient.findOneAndUpdate({user:req.user._id},req.body , {new:true});
    patient || next(new AppError('Patient Not Found',401));
    !patient || res.status(201).json({message:"Success Updated" ,patient})
});

const deletePatient = catchError(async(req,res,next)=>{
    // find patient and delete
    const patient = await Patient.findOneAndDelete({user:req.user._id});
    patient || next(new AppError('Patient Not Found',401));
    !patient || res.status(201).json({message:"Success Updated" ,patient})
});


export{
    addPatientInfo,getSpecificPAtient,getAllPatient,updatePatient,deletePatient
}
import fs from 'fs'
import path  from 'path';
import { Doctor } from "../../../database/model/doctor.model.js";
import { AppError } from "../../middleWare/AppError.js";
import { catchError } from "../../middleWare/catchError.js";
import { ApiFeatures } from '../../utils/apiFeatures.js';
import { DateTime } from 'luxon';
import { User } from '../../../database/model/user.model.js';



const addInfoToDcotor = catchError(async(req,res,next)=>{
    // check specializatin Exists Or Not
    const existsSpecialize = await Doctor.findOne({user: req.user._id});
    if(existsSpecialize) {
        req.body.image = req.file.filename
        const destinationPath = path.resolve(`uploads/doctors/${req.body.image}`);
        if(fs.existsSync(destinationPath)){
            fs.unlinkSync(destinationPath)
        }
        return next(new AppError("you Aleardy Have Specialization soory you can't Add 2 Specialization",409))
    }else{
        // find User FirstName and lastName 
    const user = await User.findById(req.body.user);

    req.body.image = req.file.filename
    // concat firstName+lasstName = fullName
    req.body.fullName = `${user.firstName} ${user.lastName}`
    const doctor = new Doctor({
        user:req.user._id,
        ...req.body
    });

    await doctor.save();
    res.status(201).json({message :"Success Add Info", doctor})
    }
});

const findDoctor = catchError(async(req,res,next)=>{
    const dateNow = DateTime.now()
    Doctor.updateMany({},{
        $pull:{
            appiontments:{
                to :{$lt :dateNow}
            }
        }
    })
    const doctor = await Doctor.findOne({user:req.user._id}).populate('user');
    if(!doctor) return next(new AppError('Doctor Not Found',409))
    doctor.user.password = undefined;
    doctor.user.email = undefined;

    res.status(201).json({message :"Success get spcific Doctor", doctor})
});

const findAllDoctor = catchError(async(req,res,next)=>{
    // ------------------------------------
        if(req.query.search){
            let mongooseQuery=mongooseQuery.find({specialization : {$regex: req.query.search , $options :'i'}})
        }
    //--------------------------
    const dateNow = DateTime.now()
    Doctor.updateMany({},{
        $pull:{
            appiontments:{
                to :{$lt :dateNow}
            }
        }
    })
    // find All Doctor With query
    let apiFeature =new ApiFeatures(Doctor.find().populate('user'),req.query)
    .pagination().filter().sort().fields()
    const doctors = await apiFeature.mongooseQuery
    let totalDoctor= await Doctor.countDocuments()
    
    res.status(201).json({message :"Success Get All Doctor",totalDoctor,page:apiFeature.pageNumber, doctors})
});


const updateDoctor = catchError(async(req,res,next)=>{
    
    const oldDoctor =  await Doctor.findOne({user:req.user._id});
    if (!oldDoctor) {
        return next(new AppError("Doctor not found",404))
    }
    const file = oldDoctor.image.split("/");
    const oldImage = file[file.length-1];
    const destinationPath = path.resolve(`uploads/doctors/${oldImage}`);
    //delete Old Image
    if(fs.existsSync(destinationPath)){
        fs.unlinkSync(destinationPath)
    } 
    if(req.file) req.body.image = req.file.filename
     // updating new doctor 
    const doctor = await Doctor.findOneAndUpdate({userId : req.user.userId} , req.body ,{new:true});
    doctor ||  next(new AppError("Doctor not found",404))
    !doctor || res.status(201).json({message:"Success",doctor})
    
});

const deleteDoctor = catchError(async(req,res,next)=>{

    const oldDoctor =  await Doctor.findOne({user:req.user._id});
    if (!oldDoctor) {
        return next(new AppError("Doctor not found",404))
    }
    const file = oldDoctor.image.split("/");
    const oldImage = file[file.length-1];
    const destinationPath = path.resolve(`uploads/doctors/${oldImage}`);
    //delete Old Image
    if(fs.existsSync(destinationPath)){
        fs.unlinkSync(destinationPath)
    } 
    if(req.file) req.body.image = req.file.filename
     // updating new doctor 
    const doctor = await Doctor.findOneAndDelete({userId : req.user.userId} , req.body ,{new:true});
    doctor ||  next(new AppError("Doctor not found",404))
    !doctor || res.status(201).json({message:"Success",doctor})
});






export {
    addInfoToDcotor,
    findDoctor,
    findAllDoctor,
    updateDoctor,
    deleteDoctor
}
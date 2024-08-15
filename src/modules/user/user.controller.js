import { User } from "../../../database/model/user.model.js";
import { catchError } from "../../middleWare/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";




const addUser = catchError(async(req,res,next)=>{
    // Add new User
    const user = new User(req.body)
    await user.save();
    res.status(201).json({message:"Success Add User" ,user})
})

const getAllUser = catchError(async(req,res,next)=>{

    // ------------------------------------
    if(req.query.search){
            mongooseQuery=mongooseQuery.find({firstName : {$regex: req.query.search , $options :'i'}})
        }
    //--------------------------
    let apiFeature =new ApiFeatures(User.find(),req.query)
    .pagination().filter().sort().fields()
    const users = await apiFeature.mongooseQuery
    
    let totalUser = await User.countDocuments()

    res.status(201).json({message:"Success Get All User",totalUser,page:apiFeature.pageNumber ,users })
})

const getSpacificUser = catchError(async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    res.status(201).json({message:"Success  User" ,user})
});

const updateUser = catchError(async(req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.params.id , req.body , {new:true})
    res.status(201).json({message:"Success Updated user" ,user})
});
const deleteeUser = catchError(async(req,res,next)=>{
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(201).json({message:"Success Deleted user" ,user})
});

export{
    addUser,getAllUser,getSpacificUser,updateUser,deleteeUser
}

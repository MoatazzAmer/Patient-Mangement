import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from "../../../database/model/user.model.js";
import { catchError } from "../../middleWare/catchError.js";
import { AppError } from '../../middleWare/AppError.js';




const signUp = catchError(async(req,res,next)=>{
    // Add New User
    const user = new User(req.body);
    await user.save();
    // make JWT
    let token = jwt.sign({userId : user._id , role:user.role} , process.env.JWT_SEKERT_KEY);

    res.status(201).json({message:"Success Register" , user,token})
});

const signIn = catchError(async(req,res,next)=>{
// find user with Email 
    const user = await User.findOne({email : req.body.email});
    if (!user || !bcrypt.compareSync(req.body.password , user.password)){
        return next(new AppError('Incorrect Email Or Password' ,409))
    }
    // make JW
    let token =jwt.sign({userId : user._id , role : user.role} ,  process.env.JWT_SEKERT_KEY)
    res.status(201).json({message : "Success Login" , token});
});


const changePassword = catchError(async(req,res,next)=>{
    // find token
    const{token} = req.headers
    // check token exists or not
    if(!token) return next(new AppError("Invalid Token" ,401))
    // verify Token
    jwt.verify(token,process.env.JWT_SEKERT_KEY,(err,playload)=>{
        if(err) return next(new AppError(err , 401))
            req.user = playload
    });
    // get Email From User
    const user = await User.findById(req.user.userId);
    // check Email Aleardy Exists Or Not And Comapre Password
    if(user && bcrypt.compareSync(req.body.oldPassword , user.password)){
        // update  Password 
        await User.findByIdAndUpdate(req.user.userId ,{password :req.body.newPassword , passwordChangedAt: Date.now()})
    }else {
        return next(new AppError("Incorrect Email Or Password" , 401))
    }
    res.status(201).json({message:"Success Change Password",token})
})

const protectedRoutes = catchError(async(req,res,next)=>{
    // find Token
    const{token}=req.headers;
    // check token exists Or Not
    if(!token) return next(new AppError('Invalid Token',401));
    // verify token
    let userPlayLoad = null
    jwt.verify(token , process.env.JWT_SEKERT_KEY,(err,playload)=>{
        if(err) return next(new AppError(err , 401));
        userPlayLoad = playload
    });

    //get user And Check user Exists Or Not
    const user = await User.findById(userPlayLoad.userId);
    if(!user) return next(new AppError("user Not Found" ,401));

    // compare time token whith change password
    if(user.passwordChangedAt){
        const time = parseInt(user.passwordChangedAt.getTime()/1000);
        if(time > userPlayLoad.iat) return next(new AppError('Invalid Token .. please Success Again' ,401))
    }
    req.user = user;
    next()
})

const referTo = (...roles)=>{

    return catchError(async(req,res,next)=>{
        // role include role in database
        if(roles.includes(req.user.role)){
            return next()
        }else{
            return next(new AppError('You Are Not Authorized To Access This Endpoint',401))
        }
    })
}

export{
    signUp,
    signIn,
    changePassword,
    protectedRoutes,
    referTo
}
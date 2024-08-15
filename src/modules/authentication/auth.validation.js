import Joi from "joi";


const signUpVal = Joi.object({
    firstName : Joi.string().min(3).max(11).required(),
    lastName  : Joi.string().min(3).max(11).required(),
    email : Joi.string().email().required(),
    password : Joi.string().pattern(/^[A-Z][a-z0-9A-Z]{8,40}$/).required(),
    role : Joi.string().required()
});

const signInVal = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().pattern(/^[A-Z][a-z0-9A-Z]{8,40}$/).required(),
});

const changePasswordval = Joi.object({
    oldPassword : Joi.string().pattern(/^[A-Z][a-z0-9A-Z]{8,40}$/).required(),
    newPassword : Joi.string().pattern(/^[A-Z][a-z0-9A-Z]{8,40}$/).required(),

})

export{
    signUpVal ,signInVal , changePasswordval
}
import Joi from "joi";



export const patientVal = Joi.object({
    complaint:Joi.string().min(3),
    user : Joi.string(),
    doctor:Joi.string()
})
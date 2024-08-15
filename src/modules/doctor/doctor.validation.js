import Joi from "joi";
import { User } from "../../../database/model/user.model";



export const addInfoToDcotorVal= Joi.object({
    specialization : Joi.string(),
    user :Joi.string(),
    image :Joi.object({
        filename : Joi.string().required(),
        originalname :Joi.string().required(),
        encoding :Joi.string().required(),
        mimetype : Joi.string().valid('image/jpeg' ,'image/png').required(),
        size : Joi.number().max(5242880).required(),
        destination :Joi.string().required(),
        filename : Joi.string().required(),
        path :Joi.string().required()
    })
})
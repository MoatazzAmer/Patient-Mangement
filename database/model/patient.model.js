
import { model, Schema, Types } from "mongoose";

const schema = new Schema({
    fullName:String,
    complaint:{
        type:String,
    },
    user:{
        type:Types.ObjectId,
        ref:'User',
        requirs:true
    },
    doctor :{
        type:Types.ObjectId,
        ref:'Doctor',
        requirs:true
    }
},{
    timestamps:true, versionKey:false
});




export const Patient = model('Patient',schema)
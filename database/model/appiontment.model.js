import { model, Schema, Types } from "mongoose";

const schema = new Schema({
    doctor:{
        type:Types.ObjectId,
        ref:'Doctor',
        required :true
    },
    patient:{
        type:Types.ObjectId,
        ref:'Patient',
        required :true
    },
    from:Date,
    to:Date,
    status:{
        type:String,
        enum: ['Scheduled', 'Completed', 'Cancelled'],
        default:'Scheduled'
    }
},{
    timestamps:true , versionKey:false
})



export const Appiontment = model('Appiontment',schema);
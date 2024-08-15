
import { model, Schema, Types } from "mongoose";

const schema = new Schema({
    fullName:String,
    specialization:{
        type: String,
        required : true,
        enum :['gra7a','']
    },
    image:String,
    user:{
        type:Types.ObjectId,
        ref:'User',
        requirs:true
    },
    appiontments:[]
},{
    timestamps:true, versionKey:false
});


schema.post('init',function(doc){
    if(doc.image) doc.image = process.env.BASE_URL +'doctors/'+ doc.image
})

export const Doctor = model('Doctor',schema)
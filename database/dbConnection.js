import mongoose from "mongoose";



export const dbConn =mongoose.connect("mongodb://localhost:27017/Patient-Management").then(()=>{
    console.log("Datebase Connected Successfyly");
}).catch(()=>{
    console.log("Error Occure In Database");
})
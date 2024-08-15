// import nodemailer from 'nodemailer'

// import { catchError } from '../middleWare/catchError.js'

// export const sendEmail =catchError(async(firstName,otp ,email)=>{
//     const transporter = nodemailer.createTransport({
//         service: 'gmail' , 
//         auth: {
//         user: "moataz.amer111@gmail.com",
//         pass: "jghdhfksvfhuxcjaw",
//         },
//     });

//     const info = await transporter.sendMail({
//         from: `"Hello ${firstName}" <moataz.amer111@gmail.com>`, 
//         to: email,
//         subject: "Verify-Email",    
//         // text: "Hello world?", 
//         html: `<h3>Your Otp Code Is => ${otp}</h3>`, 
//     });
    
//     console.log("Message sent: %s", info.messageId);
    
// })
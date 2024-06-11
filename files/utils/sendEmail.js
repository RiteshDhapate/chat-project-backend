import nodemailer from "nodemailer";
import {generateOTP} from './genrateOtp.js'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // port: 587,
    auth: {
      user: "rieshdhapatepatil@gmail.com",
      pass: "qivfhfxkjjftcjwa",
    },
  });






export async function sendEmail(toEmail,otp){
    const info = await transporter.sendMail({
        from: '"SwiftTalk 👻" <swifttalk@gmail.com>', // sender address
        to: toEmail, // list of receivers
        subject: "SwiftTalk otp", // Subject line
        text: "Hello from SwiftTalk", // plain text body
        html: `
          <b>OTP: <strong>${otp}</strong></b>  
          <p>If you didn't request this, simply ignore this message.</p>
          <p>Stay secure,</p>
          <p>SwiftTalk team</p>
      `, // html body
      });
      console.log("Message sent: %s", info.messageId);
}
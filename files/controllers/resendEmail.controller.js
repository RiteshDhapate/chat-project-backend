import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import { generateOTP } from "../utils/genrateOtp.js";

export const resendEmailController = async(req, res) => {
    try {
        const { token } = req.body;
        console.log(process.env.SECRET_KEY)
        const decodedToken =  jwt.verify(token,process.env.SECRET_KEY);
        const id = decodedToken._id;
        console.log("id : ",id);
        
        // check if user details is passed or not
        if (!id) {
            res.status(404).json({sucess:false,message:"please provide user id"});
        }
      
        let DBUser;
      
        
          DBUser = await userModel.findOne({ _id: id });
     
      
        if (!DBUser) {
            res.status(404).json({sucess:false,message:"user not found"});
        }
      
        //   sent user verification email
        const otp = generateOTP();
        const emailData =  sendEmail(DBUser.email,otp);
        res.status(200).json({sucess:true,message:"otp sent successfully",data:{ otp, email: DBUser.email }});
    } catch (error) {
        console.log(error)
        res.status(500).json({sucess:false,message:"Internal server error"});
    }
};
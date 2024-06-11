import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import { generateOTP } from "../utils/genrateOtp.js";

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    // check if user details is passed or not
    if (!email) {
      res
        .status(404)
        .json({ sucess: false, message: "please provide email and password" });
      return;
    }



     const DBUser = await userModel.findOne({ email });
  

    // check if user is already registered or not
    if (!DBUser) {
      res
        .status(404)
        .json({ sucess: false, message: "user not found" });
      return;
    }

      //   sent user verification email
      const otp = generateOTP();
      sendEmail(email, otp);
      DBUser.otp = otp;

    const token = jwt.sign(
      { _id: DBUser._id, email: DBUser.email },
      process.env.SECRET_KEY
    );
    DBUser.token = token;
    res.status(200).json({
      sucess: true,
      message: "forgot email sent successfully",
      data: {
          otp,
          token
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

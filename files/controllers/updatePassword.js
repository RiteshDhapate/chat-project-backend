import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const updatePasswordController = async (req, res) => {
  try {
    
    const { token, password } = req.body;
    if (!token || !password) {
      res.status(400).json({ sucess: false, message: "data not found" });
    }
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    const id = decodedData._id;
    let DBUser;

   
      // find user
      DBUser = await userModel.findOne({ _id: id });
  

    if (!DBUser) {
      res.status(400).json({ sucess: false, message: "user not found" });
    }

    // hash user password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const updatedUserData = await userModel.findByIdAndUpdate(
      id,
      {
        password:hash
      },
      {
        new: true,
      }
    );
    console.log(updatedUserData);
    res.status(200).json({
      sucess: true,
      message: "password updated successfully",
      data: {
        message: "password updated",
      },
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

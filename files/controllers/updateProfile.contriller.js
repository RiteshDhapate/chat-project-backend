import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
export const updateUserProfileController = async (req, res) => {
  try {
    const { token, profileImage, about, age, userName } = req.body;
    if (!token || !profileImage || !about || !age || !userName) {
      res
        .status(400)
        .json({ sucess: false, message: "provide all user details" });
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    const id = decodedData._id;
    let DBUser;  

    
      // find user
      DBUser = await userModel.findOne({ _id: id });
 

    if (!DBUser) {
      res.status(400).json({ sucess: false, message: "user not found" });
    }
    const updatedUserData = await userModel.findByIdAndUpdate(
      id,
      {
        
          profileImage,
          about,
          age,
          userName,
       
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      sucess: true,
      message: "profile update  successfully",
      data: {
        profileImage: updatedUserData.profileImage,
        about: updatedUserData.about,
        age: updatedUserData.age,
        userName: updatedUserData.userName,
      },
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

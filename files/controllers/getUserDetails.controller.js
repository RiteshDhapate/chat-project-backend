import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
export const getUserDetailController = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
     return res.status(400).json({ sucess: false, message: "User Not Login" });
    }
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    const id = decodedData._id;
    let DBUser;

    DBUser = await userModel.findOne({ _id: id });

    if (!DBUser) {
      return  res.status(400).json({ sucess: false, message: "user not found" });
    }

   return  res.status(200).json({
      sucess: true,
      message: "profile update  successfully",
      data: {
        email: DBUser?.email,
        profileImage: DBUser?.profileImage,
        about: DBUser?.about,
        age: DBUser?.age,
        userName: DBUser?.userName,
      },
    });
  } catch (error) {
    console.log(error);
   return res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

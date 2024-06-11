import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
export const verifyUserController = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(400).json({ sucess: false, message: "user not found" });
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
        isVerifyed: true,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      sucess: true,
      message: "verification successfully",
      data: {
        message: "verification updated",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

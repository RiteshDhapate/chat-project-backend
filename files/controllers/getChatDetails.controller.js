import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import GroupModel from "../models/group.model.js";
export const getChatDetailsController = async (req, res) => {
  try {
    const { token, chatId, chatType } = req.body;
    if (!token) {
      return res.status(400).json({ sucess: false, message: "User Not Login" });
      }
      

    if (!chatType || !chatId || (chatType !="friend" && chatType !="group")) {
      return res
        .status(400)
        .json({ sucess: false, message: "Data invalid . Provide the data to process" });
    }

      
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    const id = decodedData._id;

      let data;
      if (chatType === "friend") {
        data = await UserModel.findById(chatId).select(
          "userName about profileImage _id"
        );
      } else if (chatType === "group") {
          data = await GroupModel.findById(chatId);
      }
      

    res.status(200).json({
      sucess: true,
      message: "chat details",
      data,
      id
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

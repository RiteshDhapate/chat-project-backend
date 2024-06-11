import jwt from "jsonwebtoken";
import MessageModel from "../models/message.model.js";
import GroupModel from "../models/group.model.js";
export const getMessagesController = async (req, res) => {
  try {
    const { token, chatId, chatType } = req.body;
    if (!token) {
      return res.status(400).json({ sucess: false, message: "User Not Login" });
    }

    if (!chatType || !chatId || (chatType != "friend" && chatType != "group")) {
      return res.status(400).json({
        sucess: false,
        message: "Data invalid . Provide the data to process",
      });
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    const id = decodedData._id;

    let data;
    if (chatType === "friend") {
     data = await MessageModel.findOne({
        $or: [
          { from: id, to: chatId },
          { from: chatId, to: id },
        ],
     }).sort({ createdAt: 1 });
    } else if (chatType === "group") {
      data = await GroupModel.findById(chatId);
    }

    res.status(200).json({
      sucess: true,
      message: "frends",
      data:data?.messages || [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import RequestModel from "../models/request.model.js";
export const getAllFrendsRequests = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(400).json({ sucess: false, message: "User Not Login" });
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    const id = decodedData._id;

    // Get all users except the sender
    const users = await userModel
      .find({ _id: { $ne: id } })
      .select("userName about profileImage _id");

    // Fetch all requests sent by the sender
    const sentRequests = await RequestModel.find({
      from: id,
      is_accepted: true,
      is_rejected: false,
    });

    // Get IDs of users to whom requests are already sent
    const sentUserIds = sentRequests.map((request) => request.to.toString());

    // Filter out users to whom requests are already sent
    const DBUsers = users.filter((user) =>
      sentUserIds.includes(user._id.toString())
    );

    if (!DBUsers) {
      res.status(400).json({ sucess: false, message: "Frends not found" });
    }
    res.status(200).json({
      sucess: true,
      message: "Frends",
      data: DBUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

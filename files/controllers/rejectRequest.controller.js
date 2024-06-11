import jwt from "jsonwebtoken";
import RequestModel from "../models/request.model.js";
export const rejectRequestController = async (req, res) => {
  try {
    const { token, to } = req.body;
    if (!token) {
      res.status(400).json({ sucess: false, message: "User Not Login" });
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    const from = decodedData._id;

    // Find the request
    const request = await RequestModel.findOne({ from:to, to:from });

    if (!request) {
      res.status(400).json({ sucess: false, message: "request not found" });
    } else if (request.is_accepted === true) {
      res
        .status(400)
        .json({ sucess: false, message: "request already accepted" });
      return;
    } else if (request.is_rejected === true) {
      res
        .status(400)
        .json({ sucess: false, message: "request already rejected" });
      return;
    }

    // Update the request to mark it as rejected
    request.is_rejected = true;
    await request.save();

    res.status(200).json({
      sucess: true,
      message: "request rejected successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

import User from "../models/user.model.js";
import Request from "../models/request.model.js";
import jwt from "jsonwebtoken";

export const sendRequestController = async (req, res) => {
  try {
    const { token, to } = req.body;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const from = decodedToken._id;

    // check if user details is passed or not
    if (!from || !to) {
      res
        .status(404)
        .json({ sucess: false, message: "please provide user id" });
    }

    // Check if the request has already been sent
    const existingRequest = await Request.findOne({
      from,
      to,
    });
    if (existingRequest) {
      return res
        .status(400)
        .json({ sucess: false, message: "Request has already been sent." });
    }

    // Create a new request
    const newRequest = new Request({ from, to });
    await newRequest.save();

    res.status(200).json({
      sucess: true,
      message: "Request sent successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

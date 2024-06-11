import jwt from "jsonwebtoken";
import GroupModel from "../models/group.model.js";
export const createGroupController = async (req, res) => {
  try {
    const { token, groupName, about, profileImage } = req.body;

    if (!token) {
      res.status(400).json({ sucess: false, message: "User Not Login" });
      return;
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    const id = decodedData._id;

    // Check if a group with the provided group name already exists
    const existingGroup = await GroupModel.findOne({ groupName });

    if (existingGroup) {
      res.status(400).json({ sucess: false, message: "Group is alrady exist" });
      return;
    }

    const members = [id];

    // Create a new group instance
    const newGroup = new GroupModel({
      groupName,
      about,
      profileImage,
      members,
      admin: id,
    });

    // Save the group to the database
     await newGroup.save();

    res.status(200).json({
      sucess: true,
      message: "Group created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

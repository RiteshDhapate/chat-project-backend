import jwt from "jsonwebtoken";
import GroupModel from "../models/group.model.js";
export const getAllGroupJoinController = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({ sucess: false, message: "User Not Login" });
      return;
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedData._id;

    // Find all groups where the user is a member
    const groups = await GroupModel.find({ members: { $nin: [userId] } });

    // Extract specific information from each group
    const formattedGroups = groups.map((group) => ({
      _id: group._id,
      groupName: group.groupName,
      about: group.about,
      profileImage: group.profileImage,
    }));

    res.status(200).json({
      sucess: true,
      message: "Groups",
      data: formattedGroups,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

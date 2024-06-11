import jwt from "jsonwebtoken";
import GroupModel from "../models/group.model.js";
export const joinGroupController = async (req, res) => {
  try {
    const { token, groupId } = req.body;

    if (!token) {
      res.status(400).json({ sucess: false, message: "User Not Login" });
      return;
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedData._id;

    // Check if the group exists
    const group = await GroupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Check if the user is already a member of the group
    if (group.members.includes(userId)) {
      return res
        .status(400)
        .json({ error: "User is already a member of the group" });
    }

    // Add the user id to the members list of the group
    group.members.push(userId);

    // Save the updated group
     await group.save();

    res.status(200).json({
      sucess: true,
      message: "Group joined successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

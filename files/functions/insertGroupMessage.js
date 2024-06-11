import GroupModel from "../../files/models/group.model.js";

export async function insertGroupMessage(groupId, from, message, messageType = "text") {
  try {
    // Check if the group exists
    const group = await GroupModel.findById(groupId);

    if (!group) {
      return { success: false, message: "Group not found." };
    }

    // Check if the 'from' user is a member of the group
    if (!group.members.includes(from)) {
      return { success: false, message: "User is not a member of the group." };
    }

    // Push the new message into the 'messages' array
    group.messages.push({ message, from, messageType });
    await group.save();

    return { success: true, message: "Message added to the group." };
  } catch (error) {
    return { success: false, error: error.message };
  }
}



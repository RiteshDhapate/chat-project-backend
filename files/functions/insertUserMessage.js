import MessageModel from "../../files/models/message.model.js"; // Import your Mongoose model

export  async function insertUserMessage(from, to, message, messageType = "text") {
  try {
    // Check if a message document already exists between 'from' and 'to'
    let existingMessage = await MessageModel.findOne({
      $or: [
        { from, to },
        { from:to, to:from },
      ],
    });

    if (existingMessage) {
      // If the message document exists, push the new message into the 'messages' array
      existingMessage.messages.push({ message, messageType ,from});
      await existingMessage.save();
      return {
        success: true,
        message: "Message added to existing conversation.",
      };
    } else {
      // If no message document exists, create a new one
      const newMessage = new MessageModel({
        from,
        to,
        messages: [{ message, messageType, from }],
      });
      await newMessage.save();
      return { success: true, message: "New conversation created." };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}



import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    messages: [
      {
        message: {
          type: String,
          required: true,
        },
        messageType: {
          type: String,
          default: "text",
        },
        from: {
          type: String,
          required: true,
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("messages", messagesSchema);

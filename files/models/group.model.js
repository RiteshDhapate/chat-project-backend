import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      unique: true,
    },
    about: {
      type: String,
      default: "Hello everyone!!!!!!!",
    },
    profileImage: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4eMoz7DH8l_Q-iCzSc1xyu_C2iryWh2O9_FcDBpY04w&s",
    },
    members: {
      type: [String],
    },
    admin: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    messages: [
      {
        message: {
          type: String,
          required: true,
        },
        from: {
          type: String,
          required: true,
        },
        messageType: {
          type: String,
          default: "text",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("groups", groupSchema);

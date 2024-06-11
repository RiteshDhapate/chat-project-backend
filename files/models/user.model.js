import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      default: "guest",
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    profileImage: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4eMoz7DH8l_Q-iCzSc1xyu_C2iryWh2O9_FcDBpY04w&s",
    },
    about: {
      type: String,
      default: "I am ................",
    },
    age: {
      type: Number,
      default: 0,
    },
    isVerifyed: {
      type: Boolean,
      default: false,
    },
    isTwoFactorEnabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", userSchema);

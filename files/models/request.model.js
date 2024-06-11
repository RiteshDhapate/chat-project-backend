import mongoose from "mongoose";

const requestsSchema = new mongoose.Schema(
  {
    from:{
        type:mongoose.Schema.ObjectId,
        ref:"users",
        required: true,
    },
    to:{
        type:mongoose.Schema.ObjectId,
        ref:"users",
        required: true,
    },
    is_accepted:{
        type:Boolean,
        default:false
    },
    is_rejected:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("requests", requestsSchema);

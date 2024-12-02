import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  hashPassword: String,
  pic: {
    type: "String",   
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },

  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
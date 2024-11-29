import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    username: String,
    email: String,
    password: String, // hashed
    googleId: String, // for Google auth
    isOnline: { type: Boolean, default: false }
})

const User = mongoose.model("User", userSchema);

export default User;
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: mongoose.Schema.Types.ObjectId,
    receiver: mongoose.Schema.Types.ObjectId,
    content: String,
    timestamp: { type: Date, default: Date.now }
  });

const Message = mongoose.model("Message", messageSchema);

export default Message;
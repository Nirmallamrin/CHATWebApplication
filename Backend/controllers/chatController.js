import Chat from "../models/chatModel.js"
import User from "../models/userModel.js";


export const accessChat = async (req, res) => {
const { userId, requesterId } = req.body;

if (!userId) {
  console.log("UserId param not sent with request");
  return res.sendStatus(400);
}

try {
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: requesterId } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [requesterId, userId],
    };

    const createdChat = await Chat.create(chatData);
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );

    res.status(200).json(fullChat);
  }
} catch (error) {
  res.status(400).json({ message: error.message });
}

}

export const fetchChats = async (req, res) => {
 try {
   // Assuming you want to fetch all chats without authentication
   const chats = await Chat.find()
     .populate("users", "-password")
     .populate("groupAdmin", "-password")
     .populate("latestMessage")
     .sort({ updatedAt: -1 });

   // Populate the latest message sender details
   const populatedChats = await User.populate(chats, {
     path: "latestMessage.sender",
     select: "name pic email",
   });

   res.status(200).json(populatedChats);
 } catch (error) {
   res.status(400).json({ message: error.message });
 }
};

export const createGroupChat = async (req, res) => {

    const { users, name, userId } = req.body;

    // Check if required fields are present
    if (!users || !name || !userId) {
      return res.status(400).send({ message: "Please fill in all the fields" });
    }

    // Parse the list of users sent in the request body
    let parsedUsers = JSON.parse(users);

    // Ensure there are at least two users in the group (including the requester)
    if (parsedUsers.length < 2) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }

    // Add the current user (userId from request) to the users array
    parsedUsers.push(userId);

    // Verify if the user exists
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(400).send({ message: "User not found" });
    }

    try {
      // Create the new group chat
      const groupChat = await Chat.create({
        chatName: name,
        users: parsedUsers,
        isGroupChat: true,
        groupAdmin: userId, // Set the creator as the group admin
      });

      // Fetch the newly created group chat with populated fields
      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password") // Populate users, excluding password
        .populate("groupAdmin", "-password"); // Populate groupAdmin, excluding password

      // Return the full group chat details in the response
      res.status(200).json(fullGroupChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
};

export const renameGroup = async (req, res) => {
    const { chatId, newName } = req.body;

    if (!chatId || !newName) {
      return res
        .status(400)
        .json({ message: "Chat ID and new name are required" });
    }

    try {
      const chat = await Chat.findByIdAndUpdate(
        chatId,
        { chatName: newName },
        { new: true }
      );

      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }

      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }

};


export const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
};


export const addToGroup = async (req, res) => {
   const { chatId, userId } = req.body;

   // check if the requester is admin

   const added = await Chat.findByIdAndUpdate(
     chatId,
     {
       $push: { users: userId },
     },
     {
       new: true,
     }
   )
     .populate("users", "-password")
     .populate("groupAdmin", "-password");

   if (!added) {
     res.status(404);
     throw new Error("Chat Not Found");
   } else {
     res.json(added);
   }

};
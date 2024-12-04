import express from "express";
const chatRouter = express.Router();
import {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    removeFromGroup, addToGroup
} from "../controllers/chatController.js";
import { auth } from "../middlewares/auth.js";

chatRouter.post("/", accessChat);
chatRouter.get("/", fetchChats);
chatRouter.post("/group", createGroupChat);
chatRouter.put("/rename", renameGroup);
chatRouter.put("/remove", removeFromGroup);
chatRouter.put("/add", addToGroup);

export default chatRouter;
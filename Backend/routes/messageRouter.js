import express from "express";
import { getMessages, sendMessage, saveMessages } from "../controllers/messageController.js";
const messageRouter = express.Router()


messageRouter.get("/:id", getMessages);
messageRouter.post("/send/:id", sendMessage);
messageRouter.post("/", saveMessages)

export default messageRouter;
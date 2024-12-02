import express from "express";
import { signup, login, getAllUsers } from "../controllers/userController.js";
const userRouter = express.Router();
import { auth } from "../middlewares/auth.js";

userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.get("/users", getAllUsers)

export default userRouter;
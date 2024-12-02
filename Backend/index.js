import express from 'express';
import dotenv from "dotenv";
import connect from "./config/db.js";
import { chats } from './data/data.js';
import cors from "cors";
import userRouter from './routes/userRoute.js';
import chatRouter from './routes/chatRouter.js';

dotenv.config();

connect()
const app = express();
const port = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json()) 

app.use("/user", userRouter)
app.use("/chat", chatRouter)

app.get('/', (req, res) => {
    res.send('Hello Chat!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

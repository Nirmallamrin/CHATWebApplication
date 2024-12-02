import express from 'express';
import dotenv from "dotenv";
import connect from "./config/db.js";
import { chats } from './data/data.js';
import cors from "cors";
import userRouter from './routes/userRoute.js';

dotenv.config();

connect()
const app = express();
const port = process.env.PORT || 5000
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json()) // to accept json data

app.use("/user", userRouter)

app.get('/', (req, res) => {
    res.send('Hello Chat!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

import express from 'express';
import dotenv from "dotenv";
import connect from "./config/db.js";
import { chats } from './data/data.js';
import cors from "cors";

dotenv.config();

connect()
const app = express();
const port = process.env.PORT || 5000
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json())

app.get("/api/chat", (req, res) => {
    res.send(chats)
})

app.get("/api/chat/:id", (req, res) => {
    //   console.log(req.params.id);
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
});

app.get('/', (req, res) => {
    res.send('Hello Chat!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

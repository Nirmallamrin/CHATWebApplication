import express from 'express';
import dotenv from 'dotenv';
import connect from './config/db.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute.js';
import messageRouter from './routes/messageRouter.js';

dotenv.config();

connect()

const app = express();

const port = 5000

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter)
app.use("/messages", messageRouter);

app.get('/', (req, res) => {
    res.send('Hello Chat!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.MONGODB_URL)

const connect  = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB Connected")
    } catch (error) {
        console.log("error", error);
    }
}

export default connect;
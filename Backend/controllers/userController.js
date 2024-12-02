import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const {userName, email, password, pic} = req.body

        const userExist = await User.findOne({email});

        if(userExist) {
            return res.status(400).send("User is already exists");
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            userName,
            email,
            hashPassword,
            pic,
        })

        const newUserCreated = await newUser.save();

        if(!newUserCreated) {
            return res.send("User is not created")
        }

        const token = generateToken(email);

        res.cookie("Token", token)
        res.send("Registered Successfully")
    } catch (error) {
        console.log(error, "Something Wrong")
        res.status(500).send("Internal Server Error");
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send("User not Found")
        }

        const matchPassword = await bcrypt.compare(password, user.hashPassword);

        if(!matchPassword){
            return res.send("Password is not correct")
        }

        const token = generateToken(email);
        res.cookie("token", token);
        res.status(200).send("Logged in!");
    } catch (error) {
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
    }
}
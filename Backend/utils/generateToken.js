import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const generateToken = (id) => {
  return jwt.sign({ id }, secretKey, { expiresIn: "30d" });
};


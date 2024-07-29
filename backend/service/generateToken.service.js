import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envVars.config.js";

const generateToken = async (userId) => {
  const token = await jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "15d",
  });
  return token;
};

export default generateToken;

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envVars.config.js";
import UserModel from "../models/user.models.js";
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(404)
      .json({ success: false, error: "token not provided!" });
  }

  const { userId } = jwt.verify(token, JWT_SECRET);
  //console.log(decodedToken.userId);

  // call to database check user is exists or not
  const user = await UserModel.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, error: "token not provided!" });
  }

  user.password = "";
  req.user = user;
  //console.log(user);

  next();
};

export default verifyToken;

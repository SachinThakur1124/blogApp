import UserModel from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import generateToken from "../service/generateToken.service.js";
import { JWT_SECRET } from "../config/envVars.config.js";
import jwt from "jsonwebtoken";

export const userRegisterController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(401).json({
        error: "Please fill in all fields",
        success: false,
      });
    }

    const existedUser = await UserModel.findOne({ email });

    if (existedUser) {
      return res.status(400).json({
        success: false,
        error: "User already user exists.",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error :  error while registering user", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const userLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    //console.log(userExist);

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      userExist.password
    );

    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    // then generate token
    const token = await generateToken(userExist._id);

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log("Error : error while login user", error.message);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const verifyTokenController = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];

    const decoded = jwt.verify(token, JWT_SECRET);
    //console.log(decoded);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res
        .status(500)
        .json({ success: false, error: "Please provide token" });
    }
    res.status(200).json({
      success: true,
      user: {
        id: user._doc._id,
        name: user._doc.name,
        email: user._doc.email,
        password: "",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

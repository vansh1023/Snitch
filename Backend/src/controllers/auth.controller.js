import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";


async function sendTokenResponse(user, res, message) {
  const token = await jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {expiresIn: "7d"}
  );

  res.cookie("token", token)

  return res.status(200).json({
    message,
    success: true,
    user: {
        id: user._id,
        email: user.email,
        contact: user.contact,
        fullname: user.fullname,
        role: user.role
    }
  })
}


export async function registerUserController(req, res) {
  try {
    const { fullname, email, contact, password, isSeller } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (isUserAlreadyExists) {
      return res.status(409).json({
        message: "user already exists with this email or contact",
        success: false,
        err: "User already exists",
      });
    }

    const user = await userModel.create({
      fullname,
      email,
      contact,
      password,
      role: isSeller ? "seller" : "buyer"
    });

    await sendToken(user, res, "User registered successfully")
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}



export async function loginUserController(req, res){

  try {
    const { email, password } = req.body

    const user = await userModel.findOne({email})

    if(!user){
      return res.status(404).json({
        message: "Invalid email or password"
      })
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
      return res.status(404).json({
        message: "Invalid email or password"
      })
    }

    await sendTokenResponse(user, res, "User loggedin successfully")

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

import asyncHandler from "express-async-handler";
import User from "../model/user.js";
import generateToken from "../utils/token.js";

export const signUpUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const exist = await User.findOne({ email });
  if (!exist) {
    const user = User.create({
      email,
      password,
      name,
    });
    if (user) {
      const User = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      };
      return res.status(201).json({
        message: "user created successfully",
        User,
      });
    } else {
      res.status(400);
      throw new Error("invalid credentials");
    }
  } else {
    res.status(400).json({
      Error: "user already exists",
    });
  }
});

import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "user created succesfully",
      success: true,
    });
  } catch (error) {
    console.log("error occoured will registring user", error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "email or password is incorrect",
        success: false,
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        message: "email or password is incorrect",
        success: false,
      });
    }

    res.status(200).json({
      message: `welcome back ${user.name}`,
      user,
      success: true,
    });
  } catch (error) {
    console.log("error occoured while login:", error);
  }
};

import User from "../models/User.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

// GENERATE JWT TOKEN
const generateToken = (
  id,
  role
) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// REGISTER USER
export const registerUser =
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        role,
      } = req.body;

      // CHECK EXISTING USER
      const userExists =
        await User.findOne({
          email,
        });

      if (userExists) {
        return res
          .status(400)
          .json({
            message:
              "User already exists",
          });
      }

      // HASH PASSWORD
      const salt =
        await bcrypt.genSalt(
          10
        );

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        );

      // CREATE USER
      const user =
        await User.create({
          name,
          email,
          password:
            hashedPassword,
          role,
        });

      // RESPONSE
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        token:
          generateToken(
            user._id,
            user.role
          ),
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "Server Error",
        });
    }
  };

// LOGIN USER
export const loginUser =
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      // FIND USER
      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res
          .status(400)
          .json({
            message:
              "Invalid Email",
          });
      }

      // CHECK PASSWORD
      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res
          .status(400)
          .json({
            message:
              "Invalid Password",
          });
      }

      // SUCCESS RESPONSE
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        token:
          generateToken(
            user._id,
            user.role
          ),
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "Server Error",
        });
    }
  };
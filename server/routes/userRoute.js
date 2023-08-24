import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const SECRETE_KEY = process.env.SECRETE_KEY;
import User from "../models/userModel.js";

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).send({ msg: "fill all filds require" });
    } else {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ msg: "user alredy exist" });
      } else {
        const hashPassword = bcrypt.hash(password, 10);
        const user = await User.create({
          name,
          email,
          password: hashPassword,
        });
        return res.status(201).json({ msg: "user register successfully" });
      }
    }
  } catch (err) {
    return res.status(500).json({ err: err });
  }
});

router.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!(email && password)) {
      return res.status(200).json({
        msg: "fill all details",
      });
    } else {
      const user = await User.findOne({ email });
      if (user) {
        bcrypt.compare(password, user.password);
        const token = jwt.sign({ id: user._id, email }, SECRETE_KEY, {
          expiresIn: "24h",
        });
        user.password = undefined;
        return res
          .status(200)
          .json({ msg: "login succefull", user: user, token: token });
      } else {
        return res.status(500).json({ msg: "user login failed" });
      }
    }
  } catch (err) {
    return res.status(500).json({ err: err });
  }
});

export default router;

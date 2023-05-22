import express from "express";
import { User } from "../models/user.js";

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get("/", async (req, res) => {
    const users = await User.find();
    res.send(users);
});
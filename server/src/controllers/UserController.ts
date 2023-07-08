import { User } from "../models/user.js";
import { Request, Response } from "express";

export class UserController {
    public getAllUser = async (req: Request, res: Response) => {
        const users = await User.find();
        res.json(users);
    }

    public getUserById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ error: "Please provide a user id" });
            return;
        }
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(user);
    }

    public addNewUser = async (req: Request, res: Response) => {
        const newUser = new User(req.body);
        if (!newUser) {
            res.status(400).json({ error: "Please provide user" });
            return;
        }
        await newUser.save();
        res.status(201).json({ message: "New user has been added" });
    }

    public deleteUser = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ error: "Please provide a user id" });
            return;
        }
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            res.status(200).json({ message: `User with id: ${id} has been deleted` });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        const updatedUser = req.body;
        const updatedUserId = req.params.id;

        if (!updatedUserId) {
            res.status(400).json({ error: "Please provide a user id" });
            return;
        } else if (!updatedUser) {
            res.status(400).json({ error: "Please provide user data" });
            return;
        }

        await User.findByIdAndUpdate(updatedUserId, updatedUser);
        res.status(200).json({ message: "User has been updated successfully" });
    }
}
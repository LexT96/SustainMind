import { User } from "../models/user.js";
import { Request, Response } from "express";
export class UserController {
    public getAllUser = async (req: Request, res: Response) => {
        const users = await User.find();
        res.send(users);
    }
    public getUserById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a user id");
            return;
        }
        const user = await User.findById(id);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        res.send(user);
    }
    public addNewUser = async (req: Request, res: Response) => {
        const newUser = new User(req.params);
        if (!newUser) {
            res.status(400).send("Please provide user");
            return;
        }
        await newUser.save();
        }
    public deleteUser = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a user id");
            return;
        }
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            res.status(200).send(`User with id: ${id} has been deleted`);
        }
    }
    public updateUser = async (req: Request, res: Response) => {
        const updatedUser = req.params;
        const updatedUserId = req.params.id;

        if (!updatedUserId) {
            res.status(400).send("Please provide a user id");
            return;
        } else if (!updatedUser) {
            res.status(400).send("Please provide user");
            return;
        }
        await User.findByIdAndUpdate(updatedUserId, updatedUser);
    }
}
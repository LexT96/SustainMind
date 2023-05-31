import { User } from "../models/user";
import { Request, Response } from "express";
export class UserController {
    public getAll = async (req: Request, res: Response) => {
        const users = await User.find();
        res.send(users);
    }
    public getById = async (req: Request, res: Response) => {
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
    public addNew = async (req: Request) => {
        const user = new User(req.params);
        await user.save();
    }
}
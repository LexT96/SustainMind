import express from "express";
import { UserController } from "../controllers/UserController.js";

export const userRouter = express.Router();
const userController = new UserController();

userRouter.use(express.json());

userRouter.get("/", async (req, res) => {
    await userController.getAllUser(req, res);
});
  
userRouter.get("/:id", async (req, res) => {
    await userController.getUserById(req, res);
});

userRouter.post("/", async (req, res) => {
    await userController.addNewUser(req, res);
});

userRouter.put("/:id", async (req, res) => {
    await userController.updateUser(req, res);
})

userRouter.delete("/:id",async (req, res) => {
    await userController.deleteUser(req, res);
})


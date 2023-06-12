import express from "express";
import { CorporationToDoController } from "../controllers/CorporationToDoController.js";

export const corporationtodoRouter = express.Router();
const corporationtodoController = new CorporationToDoController();

corporationtodoRouter.use(express.json());

corporationtodoRouter.get("/", async (req, res) => {
    await corporationtodoController.getAllCorporationToDo(req, res);
});
  
corporationtodoRouter.get("/:id", async (req, res) => {
    await corporationtodoController.getCorporationToDoById(req, res);
});

corporationtodoRouter.post("/", async (req, res) => {
    await corporationtodoController.addNewCorporationToDo(req, res);
});

corporationtodoRouter.put("/:id", async (req, res) => {
    await corporationtodoController.updateCorporationToDo(req, res);
})

corporationtodoRouter.delete("/:id",async (req, res) => {
    await corporationtodoController.deleteCorporationToDo(req, res);
})
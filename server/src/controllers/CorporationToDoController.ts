import { CorporationToDo } from "../models/corporationtodo.js";
import { Request, Response } from "express";

export class CorporationToDoController {
  public getAllCorporationToDo = async (req: Request, res: Response) => {
    try {
      const corporationToDos = await CorporationToDo.find();
      res.json(corporationToDos);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public getCorporationToDoById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).json({ error: "Please provide a CorporationToDo id" });
        return;
      }

      const corporationToDo = await CorporationToDo.findById(id);
      if (!corporationToDo) {
        res.status(404).json({ error: "CorporationToDo not found" });
        return;
      }

      res.json(corporationToDo);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public addNewCorporationToDo = async (req: Request, res: Response) => {
    try {
      const newCorporationToDo = new CorporationToDo(req.body);
      if (!newCorporationToDo) {
        res.status(400).json({ error: "Please provide CorporationToDo" });
        return;
      }

      await newCorporationToDo.save();
      res.status(200).json({ message: "CorporationToDo has been added" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public deleteCorporationToDo = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).json({ error: "Please provide a CorporationToDo id" });
        return;
      }

      const deletedCorporationToDo = await CorporationToDo.findByIdAndDelete(id);
      if (deletedCorporationToDo) {
        res.status(200).json({ message: `CorporationToDo with id: ${id} has been deleted` });
      } else {
        res.status(404).json({ error: "CorporationToDo not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public updateCorporationToDo = async (req: Request, res: Response) => {
    try {
      const updateCorporationToDoId = req.params.id;
      if (!updateCorporationToDoId) {
        res.status(400).json({ error: "Please provide a CorporationToDo id" });
        return;
      }

      const updatedCorporationToDo = req.body;
      if (!updatedCorporationToDo) {
        res.status(400).json({ error: "Please provide CorporationToDo" });
        return;
      }

      await CorporationToDo.findByIdAndUpdate(updateCorporationToDoId, updatedCorporationToDo);
      res.status(200).json({ message: "CorporationToDo has been updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

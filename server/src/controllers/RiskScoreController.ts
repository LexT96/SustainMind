import { RiskScore } from "../models/riskScore.js";
import { Request, Response } from "express";
export class RiskScoreController {
    public getAllRiskScore = async (req: Request, res: Response) => {
        const RiskScores = await RiskScore.find();
        res.send(RiskScores);
    }
    public getRiskScoreById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a RiskScore id");
            return;
        }
        const riskScore = await RiskScore.findById(id);
        if (!riskScore) {
            res.status(404).send("RiskScore not found");
            return;
        }
        res.send(riskScore);
    }
    public addNewRiskScore = async (req: Request, res: Response) => {
        const newRiskScore = new RiskScore(req.params);
        if (!newRiskScore) {
            res.status(400).send("Please provide RiskScore");
            return;
        }

        if (newRiskScore.id == null ||   newRiskScore.productionSite == null || 
            newRiskScore.riskType == null || newRiskScore.riskScore == null || newRiskScore.priority == null)
        {
            res.status(400).send("Please check if Risk Score information are fully provided");
            return;
        }
          else {
            await newRiskScore.save();
            res.status(201).send("New Risk Score has been added");
            return;
        }
        }
    public deleteRiskScore = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a RiskScore id");
            return;
        }
        const deletedRiskScore = await RiskScore.findByIdAndDelete(id);
        if (deletedRiskScore) {
            res.status(200).send(`RiskScore with id: ${id} has been deleted`);
        }
    }
    public updateRiskScore = async (req: Request, res: Response) => {
        const updatedRiskScore = new RiskScore(req.params);
        const updateRiskScoreId = req.params.id;

        if (!updateRiskScoreId) {
            res.status(400).send("Please provide a RiskScore id");
            return;
        } else if (!updatedRiskScore) {
            res.status(400).send("Please provide RiskScore");
            return;
        }
        await RiskScore.findByIdAndUpdate(updateRiskScoreId, updatedRiskScore);
        res.status(200).send("RiskScore has been updated succesfully");
    }
}
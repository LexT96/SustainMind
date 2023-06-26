import express from "express";
import { RiskScoreController } from "../controllers/RiskScoreController.js";

export const riskScoreRouter = express.Router();
const riskScoreController = new RiskScoreController();

riskScoreRouter.use(express.json());

riskScoreRouter.get("/", async (req, res) => {
    await riskScoreController.getAllRiskScore(req, res);
});
  
riskScoreRouter.get("/:id", async (req, res) => {
    await riskScoreController.getRiskScoreById(req, res);
});

riskScoreRouter.post("/", async (req, res) => {
    await riskScoreController.addNewRiskScore(req, res);
});

riskScoreRouter.put("/:id", async (req, res) => {
    await riskScoreController.updateRiskScore(req, res);
})

riskScoreRouter.delete("/:id",async (req, res) => {
    await riskScoreController.deleteRiskScore(req, res);
})
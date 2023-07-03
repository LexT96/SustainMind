import { RiskAnalysis } from "../models/riskAnalysis.js";
import { Request, Response } from "express";
import fs from 'fs';
import csvParser from 'csv-parser';

interface Country {
  _id: string;
  name: string;
  'alpha-2': string;
  'alpha-3': string;
  region: string;
  'sub-region': string;
  'Child Labor Percentage': string;
  'Risk: Child Labor': string;
  'Modern Slavery Prevalence': string;
  'Risk: Modern Slavery': string;
  'Risk: No Freedom of Association': string;
  'Risk: Poor Labor Rights and Work Safety': string;
  'Risk: Discrimination': string;
  'Risk: Waste Water Pollution': string;
  'Risk: Poor Air Quality': string;
  'Risk: Inadequate Waste Disposal': string;
  'Risk: Release of Heavy Metals': string;
}

const countries: Country[] = [];

function parseCountriesFromCSV(): Promise<Country[]> {
    return new Promise((resolve, reject) => {
      const countries: Country[] = [];
  
      fs.createReadStream('data.csv')
        .pipe(csvParser())
        .on('data', (row) => {
          countries.push(row);
        })
        .on('end', () => {
          resolve(countries);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

export class RiskAnalysisController {
    public getAllRiskAnalysis = async (req: Request, res: Response) => {
        const RiskAnalysiss = await RiskAnalysis.find();
        res.send(RiskAnalysiss);
    }
    public getRiskAnalysisById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a RiskAnalysis id");
            return;
        }
        const riskScore = await RiskAnalysis.findById(id);
        if (!riskScore) {
            res.status(404).send("RiskAnalysis not found");
            return;
        }
        res.send(riskScore);
    }
    public addNewRiskAnalysis = async (req: Request, res: Response) => {
        const newRiskAnalysis = new RiskAnalysis(req.params);
        if (!newRiskAnalysis) {
            res.status(400).send("Please provide RiskAnalysis");
            return;
        }
          else {
            await newRiskAnalysis.save();
            res.status(201).send("New Risk Score has been added");
            return;
        }
        }
    public deleteRiskAnalysis = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a RiskAnalysis id");
            return;
        }
        const deletedRiskAnalysis = await RiskAnalysis.findByIdAndDelete(id);
        if (deletedRiskAnalysis) {
            res.status(200).send(`RiskAnalysis with id: ${id} has been deleted`);
        }
    }
    public updateRiskAnalysis = async (req: Request, res: Response) => {
        const updatedRiskAnalysis = new RiskAnalysis(req.params);
        const updateRiskAnalysisId = req.params.id;

        if (!updateRiskAnalysisId) {
            res.status(400).send("Please provide a RiskAnalysis id");
            return;
        } else if (!updatedRiskAnalysis) {
            res.status(400).send("Please provide RiskAnalysis");
            return;
        }
        await RiskAnalysis.findByIdAndUpdate(updateRiskAnalysisId, updatedRiskAnalysis);
        res.status(200).send("RiskAnalysis has been updated succesfully");
    }

    public executeRiskAnalysis = async (req: Request, res: Response) => {
        
    }
}
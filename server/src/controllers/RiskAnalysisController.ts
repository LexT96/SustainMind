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
  
  export class RiskAnalysisController {
    private countries: Country[] = [];
  
    constructor() {
      this.parseCountriesFromCSV()
        .then((countries) => {
          this.countries = countries;
        })
        .catch((error) => {
          console.error('An error occurred while parsing countries from CSV:', error);
        });
    }
    public getAllRiskAnalysis = async (req: Request, res: Response) => {
      const riskAnalyses = await RiskAnalysis.find();
      res.json(riskAnalyses);
  }

  public getRiskAnalysisById = async (req: Request, res: Response) => {
      const id = req.params.id;
      if (!id) {
          res.status(400).json({ error: "Please provide a RiskAnalysis id" });
          return;
      }
      const riskAnalysis = await RiskAnalysis.findById(id);
      if (!riskAnalysis) {
          res.status(404).json({ error: "RiskAnalysis not found" });
          return;
      }
      res.json(riskAnalysis);
  }

  public addNewRiskAnalysis = async (req: Request, res: Response) => {
      const newRiskAnalysis = new RiskAnalysis(req.body);
      if (!newRiskAnalysis) {
          res.status(400).json({ error: "Please provide RiskAnalysis" });
          return;
      } else {
          await newRiskAnalysis.save();
          res.status(201).json({ message: "New Risk Score has been added" });
          return;
      }
  }
  public deleteRiskAnalysis = async (req: Request, res: Response) => {
      const id = req.params.id;
      if (!id) {
          res.status(400).json({ error: "Please provide a RiskAnalysis id" });
          return;
      }
      const deletedRiskAnalysis = await RiskAnalysis.findByIdAndDelete(id);
      if (deletedRiskAnalysis) {
          res.status(200).json({ message: `RiskAnalysis with id: ${id} has been deleted` });
      } else {
          res.status(404).json({ error: "RiskAnalysis not found" });
      }
  }

  public updateRiskAnalysis = async (req: Request, res: Response) => {
      const updateRiskAnalysisId = req.params.id;
      if (!updateRiskAnalysisId) {
          res.status(400).json({ error: "Please provide a RiskAnalysis id" });
          return;
      }

      const updatedRiskAnalysis = req.body;
      if (!updatedRiskAnalysis) {
          res.status(400).json({ error: "Please provide RiskAnalysis data" });
          return;
      }

      await RiskAnalysis.findByIdAndUpdate(updateRiskAnalysisId, updatedRiskAnalysis);
      res.status(200).json({ message: "RiskAnalysis has been updated successfully" });
  }
    public executeRiskAnalysis = async (req: Request, res: Response) => {
    

    
    }

    public getMaxRiskValues = async (req: Request, res: Response) => {
        try {
          const countries = await this.parseCountriesFromCSV();
          const maxRiskValues = this.calculateMaxRiskValues(countries);
          res.json(maxRiskValues);
        } catch (error) {
          res.status(500).json('An error occurred while calculating max risk values');
        }
      }

    private calculateMaxRiskValues(countries: Country[]): Record<string, number> {
        const maxRiskValues: Record<string, number> = {};
    
        countries.forEach((country) => {
          Object.keys(country).forEach((property) => {
            if (property.startsWith('Risk: ')) {
              const riskValue = parseFloat(country[property as keyof Country]);
              const existingMaxValue = maxRiskValues[property] ?? -Infinity;
    
              if (riskValue > existingMaxValue) {
                maxRiskValues[property] = riskValue;
              }
            }
          });
        });
    
        return maxRiskValues;
      }
    private parseCountriesFromCSV(): Promise<Country[]> {
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
}

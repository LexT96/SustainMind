import { RiskType } from "../../models/riskType.js";

const riskTypes = [
  new RiskType({
    _id: "64a9849efcdb58653ad38346",
    name: "Child Labor",
    description: "Description of Child Labor",
  }),
  new RiskType({
    _id: "64a9849efcdb58653ad38347",
    name: "Modern Slavery",
    description: "Description of Modern Slavery",
  }),
  new RiskType({
    _id: "64a9849efcdb58653ad38348",
    name: "No Freedom of Association",
    description: "Description of No Freedom of Association",
  }),
  new RiskType({
    _id: "64a9849efcdb58653ad38349",
    name: "Poor Labor Rights & Work Safety",
    description: "Description of Poor Labor Rights and Work Safety",
  }),
  new RiskType({
    _id: "64a9849efcdb58653ad3834a",
    name: "Discrimination",
    description: "Description of Discrimination",
  }),
  new RiskType({
    _id: "64a9849efcdb58653ad3834b",
    name: "Waste Water Pollution",
    description: "Description of Waste Water Pollution",
  }),
  new RiskType({
    _id: "64a9849efcdb58653ad3834c",
    name: "Poor Air Quality",
    description: "Description of Poor Air Quality",
  }),
  new RiskType({
    _id: "64a9849efcdb58653ad3834d",
    name: "Release of Heavy Metals",
    description: "Description of Release of Heavy Metals",
  }),
  new RiskType({
    _id: "64a9849efcdb58653ad3834e",
    name: "Inadequate Waste Disposal",
    description: "Description of Inadequate Waste Disposal",
  }),
];

export const seedRiskTypes = async () => {
    console.log("seeding RiskTypes...");
    return await Promise.all(riskTypes.map(async (type, index) => {
      try {
        await type.save();
        return type;
      } catch (error) {
        console.error(error);
      }
      return false;
    }));
  };
  
  
  
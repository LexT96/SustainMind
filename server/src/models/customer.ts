import mongoose, { Schema, Types, model } from "mongoose";

const customerSchema = new Schema({
  companyName: String,
  country: String,
  region: String,
  city: String,
  zipcode: Number,
  address: String,
  contactPersonName: String,
  contactPersonEmail: String,
  accountType: String,
  numberOfEmployees: Number,
  revenue: Number,
  showOnMarketplace: { type: Boolean },
  image: String,
  description: String,
  riskAnalysis: {
    type: [
      {
        numberOfSuppliers: Number,
        date: Date,
        path: String,
      },
    ],
  },
  productionSites: {
    ref: "ProductionSite",
    type: [Types.ObjectId],
  },
  productCategories: {
    ref: "ProductCategory",
    type: [Types.ObjectId],
  },
});

export const findMaxRiskScores = (allRiskScores: any) => {
  // get the max score for every risk type
  const maxRiskScore = allRiskScores.reduce((acc: any, curr: any) => {
    if (!acc[curr.riskType.name]) {
      acc[curr.riskType.name] = curr.riskScore;
    } else if (acc[curr.riskType.name] < curr.riskScore) {
      acc[curr.riskType.name] = curr.riskScore;
    }
    return acc;
  }, {});
  const matchingMaxRiskScores = Object.entries(maxRiskScore).map(
    ([key, value]: any) => {
      const score = allRiskScores.find(
        (score: any) => score.riskScore === value && score.riskType.name === key
      );
      return score;
    }
  );
  return matchingMaxRiskScores;
};

export const Customer = model("customer", customerSchema);
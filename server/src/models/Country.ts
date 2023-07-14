import { Schema, model } from "mongoose";

const countrySchema = new Schema({
  name: String,
  alpha2: String,
  alpha3: String,
  region: String,
  subRegion: String,
  childLaborPercentage: String,
  childLabor: String,
  modernSlaveryPrevalence: String,
  modernSlavery: String,
  noFreedomOfAssociation: String,
  poorLaborRightsWorkSafety: String,
  discrimination: String,
  wasteWaterPollution: String,
  poorAirQuality: String,
  inadequateWasteDisposal: String,
  releaseOfHeavyMetals: String,
});

export const Country = model("Country", countrySchema);


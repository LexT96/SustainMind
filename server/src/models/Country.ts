import { Schema, model } from "mongoose";

const countrySchema = new Schema({
  name: String,
  alpha2: String,
  alpha3: String,
  region: String,
  subRegion: String,
  childLaborPercentage: String,
  modernSlaveryPrevalence: String,
  "Risk: Child Labor": String,
  "Risk: Modern Slavery": String,
  "Risk: No Freedom of Association": String,
  "Risk: Poor Labor Rights and Work Safety": String,
  "Risk: Discrimination": String,
  "Risk: Waste Water Pollution": String,
  "Risk: Poor Air Quality": String,
  "Risk: Inadequate Waste Disposal": String,
  "Risk: Release of Heavy Metals": String,
});

export const Country = model("Country", countrySchema);


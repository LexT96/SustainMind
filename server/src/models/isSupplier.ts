import mongoose, { Schema, Types, model } from "mongoose";

const isSupplierSchema = new Schema({
  idCorporation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  idSupplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  contractVolume: {
    type: Number,
  },
  revenue: {
    type: Number,
    required: false,
  },
  negotiationPowerWithOwnContractVolume: {
    type: Number,
    required: false,
  },
  negotiationPowerWithTotalContractVolume: {
    type: Number,
    required: false,
  },
});

export const IsSupplier = model("IsSupplier", isSupplierSchema);

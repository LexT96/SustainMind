import mongoose, { Schema, Types, model } from "mongoose";

const isSupplierSchema = new Schema({
    idCorporation:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
      },
    idSupplier:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
      },
    contractVolume: {type: String},
    });

export const IsSupplier = model("IsSupplier", isSupplierSchema);
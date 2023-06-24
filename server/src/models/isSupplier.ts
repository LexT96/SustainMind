import mongoose, { Schema, Types, model } from "mongoose";

const isSupplierSchema = new Schema({
    idCorporation:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
      },
    idSupplier:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
      },
    contractVolume: String
    });

export const IsSupplier = model("IsSupplier", isSupplierSchema);
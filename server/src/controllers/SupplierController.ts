import { IsSupplier } from "../models/isSupplier.js";
import { Request, Response } from "express";

export class SupplierController {
  public getAllSupplier = async (req: Request, res: Response) => {
    const suppliers = await IsSupplier.find();
    res.json(suppliers);
  };

  public getSupplierById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: "Please provide a Supplier id" });
      return;
    }
    const supplier = await IsSupplier.findById(id);
    if (!supplier) {
      res.status(404).json({ error: "Supplier not found" });
      return;
    }
    res.json(supplier);
  };

  public addNewSupplier = async (req: Request, res: Response) => {
    const newSupplier = new IsSupplier(req.body);
    if (!newSupplier) {
      res.status(400).json({ error: "Please provide Supplier" });
      return;
    }
    await newSupplier.save();
  };

  public deleteSupplier = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: "Please provide a Supplier id" });
      return;
    }
    const deletedIsSupplier = await IsSupplier.findByIdAndDelete(id);
    if (deletedIsSupplier) {
      res
        .status(200)
        .json({ message: `Supplier with id: ${id} has been deleted` });
    }
  };

  public updateSupplier = async (req: Request, res: Response) => {
    const updatedSupplier = new IsSupplier(req.params);
    const updatedSupplierId = req.params.id;

    if (!updatedSupplierId) {
      res.status(400).json({ error: "Please provide a Supplier id" });
      return;
    } else if (!updatedSupplier) {
      res.status(400).json({ error: "Please provide Supplier" });
      return;
    }
    await IsSupplier.findByIdAndUpdate(updatedSupplierId, updatedSupplier);
    res.status(200).json({ message: "Supplier has been updated successfully" });
  };
  public calculateNegotiationPowerWithOwnContractVolume = async (
    req: Request,
    res: Response
  ) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: "Please provide a Supplier id" });
      return;
    }

    try {
      const supplier = await IsSupplier.findById(id);
      if (!supplier) {
        res.status(404).json({ error: "Supplier not found" });
        return;
      }
      const negotiationPowerWithOwnContractVolume =
        supplier.contractVolume! / supplier.revenue!;

      // Update the supplier with the negotiation power
      supplier.negotiationPowerWithOwnContractVolume =
        negotiationPowerWithOwnContractVolume;

      await IsSupplier.findByIdAndUpdate(supplier.id, supplier);

      // Return the negotiation power in the response
      res.json({ negotiationPowerWithOwnContractVolume });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public calculateNegotiationPowerWithTotalContractVolume = async (
    req: Request,
    res: Response
  ) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: "Please provide a Supplier id" });
      return;
    }

    try {
      // Get the chosen supplier
      const supplier = await IsSupplier.findById(id);
      if (!supplier) {
        res.status(404).json({ error: "Supplier not found" });
        return;
      }

      // Get the sum of contract volumes of all suppliers
      const totalContractVolume = await IsSupplier.aggregate([
        { $group: { _id: null, total: { $sum: "$contractVolume" } } },
      ]);

      if (!totalContractVolume || totalContractVolume.length === 0) {
        res
          .status(500)
          .json({ error: "Unable to calculate total contract volume" });
        return;
      }

      const sumContractVolume = totalContractVolume[0].total;
      const negotiationPowerWithTotalContractVolume =
        sumContractVolume / supplier.revenue!;

      // Update the supplier with the negotiation power
      supplier.negotiationPowerWithTotalContractVolume =
        negotiationPowerWithTotalContractVolume;

      await IsSupplier.findByIdAndUpdate(supplier.id, supplier);

      // Return the negotiation power in the response
      res.json({ negotiationPowerWithTotalContractVolume });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

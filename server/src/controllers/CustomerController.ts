import { Customer } from "../models/customer.js";
import { Request, Response } from "express";
import { IsSupplier } from "../models/isSupplier.js";
// @ts-ignore
import {getPdf} from "../risk_analysis/generatePdf.js"
import { ProductionSite } from "../models/productionSite.js";
import { RiskScore } from "../models/riskScore.js";
import { RiskType } from "../models/riskType.js";

export class CustomerController {
  public getAllCustomer = async (req: Request, res: Response) => {
    const customers = await Customer.find();
    res.send(customers);
  };
  public getCustomerById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ error: "Please provide a Customer id"});
        return;
    }
    const customer = await Customer.findById(id).populate({
      path: "productionSites",
      populate: {
        path: "riskScores",
        populate: {
          path: "riskType",
        },
      },
    });
    if (!Customer) {
        res.status(404).json({ error: "Customer not found"});
        return;
    }
    res.json({...customer!.toJSON(), riskScores: customer!.productionSites.map((p: any) => p.riskScores).flat()});
  };
  public addNewCustomer = async (req: Request, res: Response) => {
    const newCustomer = new Customer(req.body);
    if (!newCustomer) {
      return res.status(400).json({ error: "Please provide Customer" });
    }
    const newCreatedCustomer = await newCustomer.save();
    res.json(newCreatedCustomer);
  };
  public deleteCustomer = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: "Please provide a Customer id" });
      return;
    }
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (deletedCustomer) {
      res
        .status(200)
        .json({ error: `Customer with id: ${id} has been deleted` });
    }
  };
  public updateCustomer = async (req: Request, res: Response) => {
    const updatedCustomer = new Customer(req.params);
    const updateCustomerId = req.params.id;

    if (!updateCustomerId) {
      res.status(400).json({ error: "Please provide a Customer id" });
      return;
    } else if (!updatedCustomer) {
      res.status(400).json({ error: "Please provide Customer" });
      return;
    }
    await Customer.findByIdAndUpdate(updateCustomerId, updatedCustomer);
    res.status(200).json({ error: "Customer has been updated succesfully" });
  };
  public getCustomersForMarketplace = async (req: Request, res: Response) => {
    const customers = (await Customer.find({ showOnMarketplace: true }).populate("productCategories")).map(c => c.toJSON());
    return res.send(customers);
  };

  public getSuppliersOfCustomer = async (req: Request, res: Response) => {
    const suppliers = await IsSupplier.find({
      idCorporation: req.params.id,
    }).populate({ path: "idSupplier", populate: { path: "productCategories" } });
    res.send(suppliers.map((s) => s.idSupplier));
  };

  public createNewRiskAnalysis = async (req: Request, res: Response) => {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    const types = await RiskType.find({});
    const suppliers = await IsSupplier.find({
      idCorporation: customerId,
    })
      .populate({
        path: "idSupplier",
        populate: {
          path: "productionSites",
          populate: {
            path: "riskScores",
            populate: {
              path: "riskType",
            },
          },
        },
      })
      .select("idSupplier");
    const pdfData = await getPdf(customer.companyName, suppliers.map(s => s.idSupplier));
    if (!pdfData) {
      return res.status(500).json({ error: "Could not create pdf" });
    }
    const newRiskAnalysis = {
      numberOfSuppliers: suppliers.length,
      date: new Date(),
      path: pdfData.path.replace("public/", "")
    }
    if (!customer.riskAnalysis) {
      customer.riskAnalysis = [];
    }
    customer.riskAnalysis.push(newRiskAnalysis);
    const result = await customer.save();
    res.json(result);
  };

  public getAllProductSitesOfSupplier = async (req: Request, res: Response) => {
    const supplierId: string = req.params.id;
    const productionSites = await ProductionSite.find({
      company: supplierId
    });
    // const allSuppliersOfCurrentSupplier: typeof IsSupplier[] = await IsSupplier.find({ idCorporation: supplierId });
    // // get all productionsites of suppliers of current supplier and of the current supplier
    // const productionSites = await ProductionSite.find({
    //   company: {
    //     $or: [
    //       {
    //         $in: allSuppliersOfCurrentSupplier.map(
    //           (supplier: any) => supplier.idSupplier
    //         ),
    //       },
    //       supplierId,
    //     ],
    //   },
    // });
    res.json(productionSites);
  };
}


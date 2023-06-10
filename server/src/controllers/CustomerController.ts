import { Customer } from "../models/customer";
import { Request, Response } from "express";
export class CustomerController {
    public getAllCustomer = async (req: Request, res: Response) => {
        const Customers = await Customer.find();
        res.send(Customers);
    }
    public getCustomerById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a Customer id");
            return;
        }
        const customer = await Customer.findById(id);
        if (!Customer) {
            res.status(404).send("Customer not found");
            return;
        }
        res.send(customer);
    }
    public addNewCustomer = async (req: Request, res: Response) => {
        const newCustomer = new Customer(req.params);
        if (!newCustomer) {
            res.status(400).send("Please provide Customer");
            return;
        }
        if (!(await Customer.findOne({ companyName: newCustomer.companyName }))) {
            await newCustomer.save();
          }
          else {
            res.status(400).send("Company name already exists");
            return;
        }
        }
    public deleteCustomer = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Please provide a Customer id");
            return;
        }
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (deletedCustomer) {
            res.status(200).send(`Customer with id: ${id} has been deleted`);
        }
    }
    public updateCustomer = async (req: Request, res: Response) => {
        const updatedCustomer = new Customer(req.params);
        const updateCustomerId = req.params.id;

        if (!updateCustomerId) {
            res.status(400).send("Please provide a Customer id");
            return;
        } else if (!updatedCustomer) {
            res.status(400).send("Please provide Customer");
            return;
        }
        await Customer.findByIdAndUpdate(updateCustomerId, updatedCustomer);
        res.status(200).send("Customer has been updated succesfully");
    }
}
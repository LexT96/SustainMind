import { ObjectId } from "mongoose";
import { API_URL } from "../config";

export const getAllProductionSites = async () => {
  const response = await fetch(`${API_URL}/productionSite`);
  return await response.json();
};

export const getProductionSiteById = async (id: string) => {
  const response = await fetch(`${API_URL}/productionSite/${id}`);
  return await response.json();
};

export const addNewProductionSite = async (
  name: String,
  description: String,
  productCategory: String,
  company: String,
  country: String,
  region: String,
  city: String,
  zipcode: String,
  address: String
) => {
  const requestBody = {
    name,
    description,
    productCategory,
    company,
    country,
    region,
    city,
    zipcode,
    address,
  };

  const response = await fetch(`${API_URL}/productionSite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  return await response.json();
};

export const updateProductionSite = async (
  id: string,
  name: String,
  description: String,
  company: ObjectId,
  country: String,
  region: String,
  city: String,
  zipcode: String,
  address: String
) => {
  const requestBody = {
    id,
    name,
    description,
    company,
    country,
    region,
    city,
    zipcode,
    address,
  };
  const response = await fetch(`${API_URL}/productionSite/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  return await response.json();
};

export const deleteProductionSite = async (id: string) => {
  const response = await fetch(`${API_URL}/productionSite/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};

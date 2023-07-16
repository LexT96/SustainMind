import { useUser } from "@clerk/clerk-react";
import { API_URL } from "../config";

export const getAllCustomer = async () => {
  const response = await fetch(`${API_URL}/customer`);
  return await response.json();
};
export const getAllSuppliersForMarketplace = async () => {
  const response = await fetch(`${API_URL}/customer/marketplace`);
  return await response.json();
};

export const updateCustomer = async (customer: any) => {
  const response = await fetch(`${API_URL}/customer/${customer.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });
  return await response.json();
};

export const createCustomer = async (customer: any) => {
  const response = await fetch(`${API_URL}/customer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });
  return await response.json();
};
export const getCustomer = async (id: string) => {
  const response = await fetch(`${API_URL}/customer/${id}`);
  return await response.json();
};

export const getSuppliersOfCustomer = async (id: string) => {
  const response = await fetch(`${API_URL}/customer/${id}/suppliers`);
  return await response.json();
};
export const getProductionSitesByCustomerId = async (customerId: string) => {
  const response = await fetch(
    `${API_URL}/customer/${customerId}/productionSites/`
  );
  return await response.json();
};

export const createNewRiskAnalysis = async (customerId: string) => {
  const response = await fetch(
    `${API_URL}/customer/${customerId}/risk-analysis`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

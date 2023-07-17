import mongoose, { ObjectId } from "mongoose";
import { API_URL } from "../config";

export const getSuppliers = async () => {
  const response = await fetch(`${API_URL}/supplier`);
  return await response.json();
};

export const getSupplierById = async (id: string) => {
  const response = await fetch(`${API_URL}/supplier/${id}`);
  return await response.json();
};

export const addNewSupplier = async (
  idCorporation: string,
  idSupplier: string,
  contractVolume: number
) => {
  const requestBody = {
    idCorporation,
    idSupplier,
    contractVolume,
  };

  const response = await fetch(`${API_URL}/supplier`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  return await response.json();
};

export const updateSupplier = async (
  id: string,
  idCorporation: ObjectId,
  idSupplier: ObjectId,
  contractVolume: number,
  revenue: number
) => {
  const requestBody = {
    idCorporation,
    idSupplier,
    contractVolume,
    revenue,
  };
  const response = await fetch(`${API_URL}/supplier/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  return await response.json();
};

export const deleteSupplier = async (id: string) => {
  const response = await fetch(`${API_URL}/supplier/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};

export const calculateNegotiationPowerWithOwnContractVolume = async (
  id: string
) => {
  const response = await fetch(
    `${API_URL}/supplier/calculateNegotiationPowerWithOwnContractVolume/${id}`
  );
  return await response.json();
};

export const calculateNegotiationPowerWithTotalContractVolume = async (
  id: string
) => {
  const response = await fetch(
    `${API_URL}/supplier/calculateNegotiationPowerWithTotalContractVolume/${id}`
  );
  return await response.json();
};

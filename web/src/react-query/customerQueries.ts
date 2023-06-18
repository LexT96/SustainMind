import { createCustomer, getAllSuppliersForMarketplace, updateCustomer } from "../api/customerApi";
import { useMutation, useQuery } from "react-query";

export const useAllSuppliersForMarketplace = () => {
    return useQuery('marketplace', getAllSuppliersForMarketplace);
}

export const useUpdateCustomerMutation = (customerId: string) => {
    return useMutation('updateCustomer', updateCustomer, {
        onSuccess: (data: any) => {
            return data;
        }
    });
}

export const useCreateCustomerMutation = (customerData: any) => {
    return useMutation('createCustomer', createCustomer, {
        onSuccess: (data: any) => {
            return data;
        }
    });
}
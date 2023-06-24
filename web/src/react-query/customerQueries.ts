import { getAllSuppliersForMarketplace, getCustomer } from "../api/customerApi";
import { useQuery } from "react-query";

export const useAllSuppliersForMarketplace = () => {
    return useQuery('marketplace', getAllSuppliersForMarketplace);
}

export const useCustomerQuery = (id: string) => {
    return useQuery(['customer', id], () => getCustomer(id));
}
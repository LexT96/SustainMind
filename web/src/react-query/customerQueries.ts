import { getAllSuppliersForMarketplace } from "../api/customerApi";
import { useQuery } from "react-query";

export const useAllSuppliersForMarketplace = () => {
    return useQuery('marketplace', getAllSuppliersForMarketplace);
}
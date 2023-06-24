import { Box, Button, FormControl, Grid, Stack, TextField } from "@mui/material";
import { PageLayout } from "../components/PageLayout"
import { SupplierCard } from "../components/Suppliers/SupplierCard";
import { SuppliersTable } from "../components/Suppliers/SuppliersTable";
import { MarketplaceCard } from "../components/Marketplace/MarketplaceCard";
import { useSuppliersOfCustomerQuery } from "../react-query/customerQueries";
import { useUser } from "@clerk/clerk-react";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { Searchbar } from "../components/Searchbar";

export const SuppliersPage = () => {
  const { user } = useUser();
  const {data: suppliers, isLoading, isError} = useSuppliersOfCustomerQuery(user?.unsafeMetadata?.customerId as string ?? "649424265080088e66c99bce");
  const [matchingSuppliers, setMatchingSuppliers] = useState(suppliers);

  useEffect(() => {
    if (!isLoading) setMatchingSuppliers(suppliers);
  }, [isLoading])

    return (
      <PageLayout>
        {suppliers && (
          <>
            <Searchbar
              label={"Supplier"}
              options={suppliers.map((s: any) => s.companyName)}
              onInputChange={(event: Event, value: string) => {
                setMatchingSuppliers(
                  suppliers.filter((s: any) => s.companyName.toLowerCase().includes(value.toLowerCase()))
                );
              }}
            />
            <Grid container rowSpacing={3} columnSpacing={3}>
              {matchingSuppliers &&
                matchingSuppliers.map((supplier: any) => (
                  <Grid item xs={12} sm={6} md={4}>
                    <MarketplaceCard
                      forMarketplace={false}
                      supplier={supplier}
                    />
                  </Grid>
                ))}
            </Grid>
          </>
        )}
      </PageLayout>
    );
}
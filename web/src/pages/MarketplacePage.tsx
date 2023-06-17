import { Box, Button, FormControl, Grid, InputLabel, TextField } from "@mui/material";
import { PageLayout } from "../components/PageLayout"
import { MarketplaceCard } from "../components/Marketplace/MarketplaceCard"
import SearchIcon from '@mui/icons-material/Search';
import { useAllSuppliersForMarketplace } from "../react-query/customerQueries";

    export const MarketplacePage = () => {
      const { data: suppliers, isLoading } = useAllSuppliersForMarketplace();
        return (
          <PageLayout>
            <Box sx={{ display: "flex", mb: 3 }}>
              <FormControl sx={{ width: "100%", mr: 1 }}>
                <TextField id="search-supplier" label="Search supplier" /> 
              </FormControl>
              <Button variant="contained" color="success">
                <SearchIcon />
              </Button>
            </Box>
            <Grid container spacing={3}>
              {suppliers && suppliers.map((supplier: any) => (
                <Grid item xs={12} md={6}>
                  <MarketplaceCard supplier={supplier} />
                </Grid>
              ))}
            </Grid>
          </PageLayout>
        );
    }
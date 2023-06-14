import { Box, Button, FormControl, Grid, InputLabel, TextField } from "@mui/material";
import { PageLayout } from "../components/PageLayout"
import { MarketplaceCard } from "../components/Marketplace/MarketplaceCard"
import SearchIcon from '@mui/icons-material/Search';
const mockSuppliers = [
  {
    id: 1,
    name: "SupplierName",
    image: "https://picsum.photos/300",
    numberOfProductionSites: 3,
    productCategories: ["Textiles", "Consumer Electronics"],
    score: 3.5,
    location: "Bangladesh, India",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet nisi tincidunt, interdum tellus a, dignissim diam. Mauris luctus consequat erat nec rhoncus. Suspendisse consequat, purus in faucibus porttitor, odio sem viverra nisi, non hendrerit tellus augue at dui. Nam at finibus justo, sed condimentum nisi. Suspendisse gravida aliquam leo, in tempor nibh pulvinar in. Suspendisse iaculis massa eu diam tincidunt varius eget eu mi. Curabitur pretium ante id ante pellentesque, a convallis mi tempor. ",
  },
  {
    id: 1,
    name: "SupplierName",
    image: "https://picsum.photos/300",
    numberOfProductionSites: 3,
    productCategories: ["Automotive", "Food and Beverage"],
    score: 3.5,
    location: "Bangladesh, India",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet nisi tincidunt, interdum tellus a, dignissim diam. Mauris luctus consequat erat nec rhoncus. Suspendisse consequat, purus in faucibus porttitor, odio sem viverra nisi, non hendrerit tellus augue at dui. Nam at finibus justo, sed condimentum nisi. Suspendisse gravida aliquam leo, in tempor nibh pulvinar in. Suspendisse iaculis massa eu diam tincidunt varius eget eu mi. Curabitur pretium ante id ante pellentesque, a convallis mi tempor. ",
  },
  {
    id: 1,
    name: "SupplierName",
    image: "https://picsum.photos/300",
    numberOfProductionSites: 3,
    score: 3.5,
    productCategories: ["Textiles", "Automotive", "Food and Beverage"],
    location: "Bangladesh, India",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet nisi tincidunt, interdum tellus a, dignissim diam. Mauris luctus consequat erat nec rhoncus. Suspendisse consequat, purus in faucibus porttitor, odio sem viverra nisi, non hendrerit tellus augue at dui. Nam at finibus justo, sed condimentum nisi. Suspendisse gravida aliquam leo, in tempor nibh pulvinar in. Suspendisse iaculis massa eu diam tincidunt varius eget eu mi. Curabitur pretium ante id ante pellentesque, a convallis mi tempor. ",
  }
];

    export const MarketplacePage = () => {
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
              {mockSuppliers.map((supplier) => (
                <Grid item xs={12} md={6}>
                  <MarketplaceCard supplier={supplier} />
                </Grid>
              ))}
            </Grid>
          </PageLayout>
        );
    }
import { Avatar, Card, Stack, Typography } from "@mui/material";
import { ProductScore } from "../Products/ProductScore";

export const SupplierCard = ({supplier}: any) => {
    return (
      <Card sx={{ display: "flex", px: 2, py: 1, borderRadius: 2 }}>
                  <Avatar sx={{ height: 60, width: 60, mr: 2 }} src={supplier.image} />

        <Stack>
          <Typography variant="h6">{supplier.name}</Typography>
          {supplier.location}
          <ProductScore score={supplier.score} />
        </Stack>
        {supplier.numberOfProductionSites}
      </Card>
    );
};
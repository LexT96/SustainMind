import { useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout"
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { ProductScore } from "../components/Products/ProductScore";
import { SupplierRisk } from "../components/Suppliers/SupplierRisk";

const supplier = {
  id: 1,
  name: "Iron Works Inc.",
  image: "https://picsum.photos/300",
  score: 3.5,
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
};
export const SupplierDetailPage = () => {
    const { id } = useParams();
    return (
      <PageLayout>
        <Box sx={{ display: "flex" }}>
          <Avatar
            src={supplier.image}
            sx={{ height: 200, width: 200, border: "1px solid black", mr: 7 }}
          />
          <Box className="space-y-4">
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {supplier.name}
            </Typography>
            <ProductScore score={supplier.score} />
            <Typography>{supplier.description}</Typography>
          </Box>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 5 }}>
          Risks
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Potential risks identified based on production countries and product
          categories
        </Typography>
        <Grid container spacing={3}>
          <Grid xs={4}>
            <SupplierRisk
              name={"Work safety"}
              score={6}
              explanation={"dasdasdsadsadsadsadsdsadsadsdsadsds"}
            />
          </Grid>
          <Grid xs={4}>
            <SupplierRisk
              name={"Slave labour"}
              score={2}
              explanation={"dasdasdsadsadsadsadsdsadsadsdsadsds"}
            />
          </Grid>
        </Grid>
      </PageLayout>
    );
}
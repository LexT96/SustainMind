import { Avatar, Card } from "@mui/material";

export const SupplierCard = ({supplier}: any) => {
    return (
      <Card sx={{ display: "flex", px:2, py:1, borderRadius: 10, mb:1}}>
        <Avatar src={supplier.image} />
        {supplier.name}
        {supplier.score}
        {supplier.numberOfProductionSites}
        {supplier.location}
      </Card>
    );
};
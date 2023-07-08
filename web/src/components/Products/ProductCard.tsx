import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { ProductScore } from "./ProductScore";

export const ProductCard = ({ product }: { product: any }) => {
  return (
    <Card sx={{ maxWidth: 345 }} className="">
      <CardActionArea>
        <a href={"/products/" + product.id}>
          <div className="h-0 relative pb-[50%]">
            <img
              className="absolute left-1/4 h-full w-1/2 object-cover rounded-full mx-auto mt-2"
              src={product.image}
              alt={product.name}
            />
          </div>
          <CardContent className="space-y-1">
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <ProductScore score={product.score} />
          </CardContent>
        </a>
      </CardActionArea>
    </Card>
  );
};

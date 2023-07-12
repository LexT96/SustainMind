import { MainNavbar } from "../components/Navbars/MainNavbar";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Autocomplete, Button, CardActionArea, CardActions, Grid, TextField } from '@mui/material';
import { PageLayout } from "../components/PageLayout";
import { ProductCard } from "../components/Products/ProductCard";
import { useState } from "react";
import { Searchbar } from "../components/Searchbar";
import { AddModal } from "../components/AddModal";
import { AddProductModal } from "../components/Products/AddProductModal";

const mockProducts = [
    {
    id: 1,
    name: "Black T-Shirt Men",
    image: "products/black_tshirt.jpeg",
    description: "Test description",
    score: 6.7
},
{
    id: 2,
    name: "White T-Shirt Women",
    image: "products/white_tshirt_women.jpeg",
    description: "Test description",
    score: 8.8
},
{
    id: 3,
    name: "White T-Shirt Men",
    image: "products/white_tshirt.jpeg",
    description: "Test description",
    score: 8.6
},
{
    id: 4,
    name: "Women Business Shirt",
    image: "products/women_business_shirt.jpg",
    description: "Test description",
    score: 2.9
},
{
    id: 5,
    name: "Jeans Blue Men",
    image: "products/jeans_men.jpg",
    description: "Test description",
    score: 6.0
},
{
    id: 6,
    name: "Ripped Jeans Women",
    image: "products/ripped_jeans_women.jpeg",
    description: "Test description",
    score: 7.4
}
]
export function ProductsPage () {
    const [matchingProducts, setMatchingProducts] = useState(mockProducts);
    const [addModalOpen, setAddModalOpen] = useState(false);
    return (
      <PageLayout>
        <AddProductModal open={addModalOpen} setOpen={setAddModalOpen} />
        <Searchbar
          label={"Product"}
          options={mockProducts.map((p) => p.name)}
          onInputChange={(event: Event, value: string) => {
            setMatchingProducts(
              mockProducts.filter((p) => p.name.includes(value))
            );
          }}
        />
        <div className="mb-2 flex justify-between items-center px-8">
        <p >{matchingProducts.length} Results</p>
        <Button variant="contained" color="success" onClick={() => setAddModalOpen(true)}>Add Product</Button>
        </div>

        <Grid container rowSpacing={3} columnSpacing={1}>
          {matchingProducts.map((product) => (
            <Grid
              className="justify-center flex sm:block"
              item
              xs={12}
              sm={6}
              md={4}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </PageLayout>
    );
}
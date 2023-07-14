import { Product } from "../../models/product.js";

const products = [
  new Product({
    name: "Black T-Shirt Men",
    image: "products/black_tshirt.jpeg",
    description: "Test description",
    score: 6.7,
  }),
  new Product({
    name: "White T-Shirt Women",
    image: "products/white_tshirt_women.jpeg",
    description: "Test description",
    score: 8.8,
  }),
  new Product({
    name: "White T-Shirt Men",
    image: "products/white_tshirt.jpeg",
    description: "Test description",
    score: 8.6,
  }),
  new Product({
    name: "Women Business Shirt",
    image: "products/women_business_shirt.jpg",
    description: "Test description",
    score: 2.9,
  }),
  new Product({
    name: "Jeans Blue Men",
    image: "products/jeans_men.jpg",
    description: "Test description",
    score: 6.0,
  }),
  new Product({
    name: "Ripped Jeans Women",
    image: "products/ripped_jeans_women.jpeg",
    description: "Test description",
    score: 7.4,
  }),
];

export const seedProducts = async () => {
    console.log("seeding Products...");
    return await Promise.all(products.map(async (product, index) => {
      try {
        await product.save();
        return product;
      } catch (error) {
        console.error(error);
      }
      return false;
    }));
  };
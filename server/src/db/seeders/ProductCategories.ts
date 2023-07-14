import { ProductCategory } from "../../models/productCategory.js";

const categories = [
  new ProductCategory({
      _id: "6499ca2153037565702d91bd",
      name: "Apparel and Fashion",
  }),
  new ProductCategory({
      _id: "6499ca4d53037565702d91be",
      name: "Home and Kitchen",
  }),
  new ProductCategory({
      _id: "6499ca5d53037565702d91bf",
      name: "Health and Beauty",
  }),
];

export const seedProductCategories = async () => {
    console.log("seeding Productcategories...");
    return await Promise.all(
      categories.map(async (category, index) => {
        try {
          if (await ProductCategory.findOne({ name: category.name })) {
            return;
          }
          await category.save();
          return category;
        } catch (error) {
          console.error(error);
        }
        return false;
      })
    );
  };
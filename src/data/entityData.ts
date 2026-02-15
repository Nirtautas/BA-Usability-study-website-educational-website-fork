import { Product, ProductType } from "./types";

export const products: Product[] = [
  {
    id: 1,
    type: ProductType.DeceptiveExtra,
    name: "Extra service",
    description: "Extra service",
    price: 3.99
  },
  {
    id: 2,
    type: ProductType.Shoes,
    name: "Product 1",
    description: "This is the description for Product 1",
    price: 10.99
  },
  {
    id: 3,
    type: ProductType.Shoes,
    name: "Product 2",
    description: "This is the description for Product 2",
    price: 20.99
  },
  {
    id: 4,
    type: ProductType.Shoes,
    name: "Product 3",
    description: "This is the description for Product 3",
    price: 30.99,
    discountedPrice: 20.99
  }
];
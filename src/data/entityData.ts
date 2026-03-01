import { placeholderImageLink } from "./constants";
import { Bank, Product, ProductType } from "./types";

export const products: Product[] = [
  {
    id: 1,
    type: ProductType.DeceptiveExtra,
    name: "Extra service",
    description: "Extra service",
    price: 3.99,
    rating: 0,
    ratingCount: 124,
    deliveryTime: "1-2 d."
  },
  {
    id: 2,
    type: ProductType.Shoes,
    name: "Product 1",
    description: "This is the description for Product 1",
    price: 10.99,
    rating: 4.5,
    ratingCount: 124,
    deliveryTime: "1-2 d.",
    picturePaths: [placeholderImageLink, placeholderImageLink, placeholderImageLink, placeholderImageLink, placeholderImageLink, placeholderImageLink]
  },
  {
    id: 3,
    type: ProductType.Shoes,
    name: "Product 2",
    description: "This is the description for Product 2",
    price: 20.99,
    rating: 3.5,
    ratingCount: 124,
    deliveryTime: "1-2 d.",
    picturePaths: [placeholderImageLink, placeholderImageLink, placeholderImageLink],
  },
  {
    id: 4,
    type: ProductType.Shirts,
    name: "Product 3",
    description: "This is the description for Product 3",
    price: 30.99,
    discountedPrice: 20.99,
    rating: 5,
    ratingCount: 124,
    deliveryTime: "1-2 d.",
    picturePaths: [placeholderImageLink, placeholderImageLink, placeholderImageLink],
  }
];

export const banks: Bank[] = [
  {
    name: "Bank 1",
    picturePath: placeholderImageLink
  },
  {
    name: "Bank 2",
    picturePath: placeholderImageLink
  },
  {
    name: "Bank 3",
    picturePath: placeholderImageLink
  },
  {
    name: "Bank 4",
    picturePath: placeholderImageLink
  },
  {
    name: "Bank 5",
    picturePath: placeholderImageLink
  },
];
import { Product } from "./types";
import { v4 } from "uuid";

export const products: Product[] = [
    {
        id: v4(),
        name: "Product 1",
        description: "This is the description for Product 1",
        price: 10.99
    },
    {
        id: v4(),
        name: "Product 2",
        description: "This is the description for Product 2",
        price: 20.99
    },
    {
        id: v4(),
        name: "Product 3",
        description: "This is the description for Product 3",
        price: 30.99
    }
];
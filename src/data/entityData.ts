import { placeholderImageLink } from "./constants";
import { Bank, DeliveryLocation, Product, ProductType } from "./types";

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
    id: 1,
    name: "Bank 1",
    picturePath: placeholderImageLink
  },
  {
    id: 2,
    name: "Bank 2",
    picturePath: placeholderImageLink
  },
  {
    id: 3,
    name: "Bank 3",
    picturePath: placeholderImageLink
  },
  {
    id: 4,
    name: "Bank 4",
    picturePath: placeholderImageLink
  },
  {
    id: 5,
    name: "Bank 5",
    picturePath: placeholderImageLink
  },
];

export const storeLocations: DeliveryLocation[] = [
  {
    id: 1,
    locationName: "Store Location 1"
  },
  {
    id: 2,
    locationName: "Store Location 2"
  },
  {
    id: 3,
    locationName: "Store Location 3"
  }
];

export const postOfficeLocations: DeliveryLocation[] = [
  {
    id: 1,
    locationName: "Post Office Location 1"
  },
  {
    id: 2,
    locationName: "Post Office Location 2"
  },
  {
    id: 3,
    locationName: "Post Office Location 3"
  }
];

export const parcelLockerLocations: DeliveryLocation[] = [
  {
    id: 1,
    locationName: "Parcel Locker Location 1"
  },
  {
    id: 2,
    locationName: "Parcel Locker Location 2"
  },
  {
    id: 3,
    locationName: "Parcel Locker Location 3"
  }
];
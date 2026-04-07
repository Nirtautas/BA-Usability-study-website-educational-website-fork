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
    name: "Fintech",
    picturePath: "/images/bankPictures/fintech.jpg"
  },
  {
    id: 2,
    name: "Finance",
    picturePath: "/images/bankPictures/finance.jpg"
  },
  {
    id: 3,
    name: "Avobank",
    picturePath: "/images/bankPictures/avobank.jpg"
  },
  {
    id: 4,
    name: "MoneyCare",
    picturePath: "/images/bankPictures/moneycare.jpg"
  },
  {
    id: 5,
    name: "FastCash",
    picturePath: "/images/bankPictures/fastcash.jpg"
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
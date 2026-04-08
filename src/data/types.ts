export type Product = {
  id: number
  type: ProductType,
  name: string
  picturePaths?: string[]
  description?: string
  price: number
  discountedPrice?: number
  rating: number
  ratingCount: number
  deliveryTime: string
};

export enum ProductType {
  Shoes = "Shoes",
  Shirts = "Shirts",
  Pants = "Pants",
  Dresses = "Dresses",
  DeceptiveExtra = "Extra"
}

export const productTypeTranslationKeyMap: Record<ProductType, string> = {
  [ProductType.Shoes]: "ProductType.shoesOption",
  [ProductType.Pants]: "ProductType.pantsOption",
  [ProductType.Shirts]: "ProductType.shirtOption",
  [ProductType.Dresses]: "ProductType.dressOption",
  [ProductType.DeceptiveExtra]: "",
};

export type CartItem = {
  itemId: number
  quantity: number
};

export type FullCartItem = {
  item: Product;
  quantity: number;
};

export interface CartContextInterface {
  cart: CartItem[];
  modifyCart: (itemId: number, quantityChange: number) => void;
  removeFromCart: (id: number) => void;
  removeAllFromCart: () => void;
  getUniqueItemsCount: (includeDeceptive?: boolean) => number;
  getFullCartItems: () => FullCartItem[];
  calculateItemTotal: () => number;
  calculateTotal: () => number;
};

export type Bank = {
  id: number;
  name: string;
  picturePath: string;
};

export type DeliveryLocation = {
  id: number;
  locationName: string;
};

export type DeliveryMethod = "store" | "post" | "locker";

export type DeliveryInfo = {
  deliveryMethod: DeliveryMethod;
  locationId?: number;
  differentPersonPickUp?: boolean;
  phoneNumber?: string;
  consigneeName?: string;
};
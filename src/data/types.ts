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
  Shoes = "shoes",
  DeceptiveExtra = "extra"
}

export type CartItem = {
  itemId: number
  quantity: number
};

export type FullCartItem = {
  item: Product;
  quantity: number;
};

export type CartItemDetailed = {
  item: Product
  quantity: number
}

export interface CartContextInterface {
  cart: CartItem[];
  modifyCart: (itemId: number, quantityChange: number) => void;
  removeFromCart: (id: number) => void;
  removeAllFromCart: () => void;
  getUniqueItemsCount: (includeDeceptive?: boolean) => number;
};
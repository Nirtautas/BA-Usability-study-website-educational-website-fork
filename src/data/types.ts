export type Entity = {
  id: string;
};

export type Product = {
  id: string
  name: string
  picturePaths?: string[]
  description?: string
  price: number
};

export type CartItem = {
  products: Product[]
  quantity: number
};

export type Cart = {
  items: CartItem[]
};
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
  stock: number
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
  getDeliveryFee: (deliveryMethod?: string) => number;
  calculateTotal: (deliveryMethod?: string) => number;
};

export interface UserContextInterface {
  userData: UserInfo[];
  loggedInUserId?: number;
  attemptLogin: (email: string, password: string) => number | undefined;
  logout: () => void;
  getLoggedInUserData: () => UserInfo | undefined;
  attemptRegistration: (registerInfo: RegisterInfo) => string;
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

export enum Gender {
  Male = "Male",
  Female = "Female"
}

export const genderTypeTranslationKeyMap: Record<Gender, string> = {
  [Gender.Male]: "Gender.maleOption",
  [Gender.Female]: "Gender.femaleOption"
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
};

export type UserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string
  phoneNumber: string;
  password: string;
  gender: Gender;
}
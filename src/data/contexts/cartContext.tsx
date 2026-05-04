"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CART_STORAGE_KEY, parcelLockerPrice, postDeliveryPrice, serviceFee } from "../constants";
import { products } from "../entityData";
import { CartContextInterface, CartItem, FullCartItem, ProductType } from "../types";

const CartContext = createContext<CartContextInterface | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = sessionStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const modifyCart = (itemId: number, quantityChange: number) => {
    setCart((prev) => {
      let modifiedCart = [...prev];
      const itemAlreadyExists = modifiedCart.find((i) => i.itemId === itemId);
      const itemToAdd = getFullCartItem(itemId);
      const cartItems = getFullCartItems();
      if (itemToAdd) {
        cartItems.push(itemToAdd);
      }
      const allSubscriptions = cartItems.every((i) => i.item.type === ProductType.Subscriptions);

      if (itemAlreadyExists) {
        modifiedCart = modifiedCart.map((i) => (i.itemId === itemId ? { ...i, quantity: i.quantity + quantityChange } : i)).filter((i) => i.quantity > 0);
      } else if (quantityChange > 0) {
        modifiedCart.unshift({ itemId, quantity: quantityChange });

        if (!modifiedCart.find((i) => i.itemId === 1) && !allSubscriptions) {
          modifiedCart.push({ itemId: 1, quantity: 1 });
        }
      }

      return modifiedCart;
    });
  };

  const allItemsAreSubscriptions = () => {
    return cart.length > 0 && getFullCartItems().every((i) => i.item.type === ProductType.Subscriptions);
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => prev.filter((i) => i.itemId !== itemId));
  };

  const removeAllFromCart = () => {
    setCart([]);
  };

  const getUniqueItemsCount = (includeDeceptive = false) => {
    const deceptiveExists = cart.find((i) => i.itemId === 1) ? true : false;
    return cart.length - (!includeDeceptive && deceptiveExists ? 1 : 0);
  };

  const getFullCartItems = () => {
    return (
      cart
        .map((item) => {
          const product = products.find((p) => p.id === item.itemId);
          return { item: product, quantity: item.quantity };
        })
        .filter((i): i is FullCartItem => i.item !== undefined) || []
    );
  };

  const getFullCartItem = (itemId: number) => {
    const product = products.find((p) => p.id === itemId);
    const quantity = cart.find((i) => i.itemId === itemId)?.quantity || 0;
    if (product) return { item: product, quantity };
    return undefined;
  };

  const calculateItemTotal = () => {
    return getFullCartItems().reduce((total, cartItem) => total + (cartItem.item.discountedPrice !== undefined ? cartItem.item.discountedPrice : cartItem.item.price) * cartItem.quantity, 0);
  };

  const getDeliveryFee = (deliveryMethod?: string) => {
    if (deliveryMethod === "post") return postDeliveryPrice;
    if (deliveryMethod === "locker") return parcelLockerPrice;
    return 0;
  };

  const calculateTotal = (deliveryMethod?: string) => {
    return calculateItemTotal() + (getUniqueItemsCount(true) !== 0 && deliveryMethod ? serviceFee : 0) + getDeliveryFee(deliveryMethod);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        modifyCart,
        allItemsAreSubscriptions,
        removeFromCart,
        removeAllFromCart,
        getUniqueItemsCount,
        getFullCartItems,
        calculateItemTotal,
        getDeliveryFee,
        calculateTotal,
        getFullCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}

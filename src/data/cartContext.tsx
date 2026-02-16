"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CartContextInterface, CartItem } from "./types";

const CartContext = createContext<CartContextInterface | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const modifyCart = (itemId: number, quantityChange: number) => {
    setCart((prev) => {
      let modifiedCart = [...prev];
      const exists = modifiedCart.find((i) => i.itemId === itemId);

      if (exists) {
        modifiedCart = modifiedCart.map((i) => (i.itemId === itemId ? { ...i, quantity: i.quantity + quantityChange } : i)).filter((i) => i.quantity > 0);
      } else if (quantityChange > 0) {
        modifiedCart.unshift({ itemId, quantity: quantityChange });

        if (!modifiedCart.find((i) => i.itemId === 1)) {
          modifiedCart.push({ itemId: 1, quantity: 1 });
        }
      }

      return modifiedCart;
    });
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

  return (
    <CartContext.Provider
      value={{
        cart,
        modifyCart,
        removeFromCart,
        removeAllFromCart,
        getUniqueItemsCount,
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

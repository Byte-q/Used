"use client";
import { createContext, useContext, useState } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity?: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  totalPrice: 0
});

import { ReactNode } from "react";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = async (product: Product): Promise<void> => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 0) + 1 } : p
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart: Product[]) =>
      prevCart.filter((item: Product) => item.id !== id)
    );
  };

  // 🟢 Increase quantity
  const increaseQuantity = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id
          ? { ...product, quantity: (product.quantity ?? 0) + 1 }
          : product
      )
    );
  };

  // 🟢 Decrease quantity of a product in the cart
  const decreaseQuantity = (id: string) => {
    setCart((prevCart) =>
      prevCart
        .map((product) =>
          product.id === id && product.quantity && product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity && product.quantity > 0)
    );
  };

  // 🟢 Calculate total price
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * (product.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}


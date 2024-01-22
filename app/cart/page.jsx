"use client";

import { Cart, CartSummary } from "@/components";
import { getCartData } from "@/hooks/cart";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const clearCart = () => {
    // Clear the cart from localStorage
    localStorage.removeItem("cartData");

    // Clear the cart state in the component
    setCartProducts([]);
  };

  useEffect(() => {
    const fetchCartProducts = () => {
      const data = getCartData();
      setCartProducts(data);
    };
    fetchCartProducts();
    window.addEventListener("storage", fetchCartProducts);
    return () => {
      window.removeEventListener("storage", fetchCartProducts);
    };
  }, []);

  return (
    <>
      <Cart cartData={cartProducts} setCartProducts={setCartProducts} />
      <CartSummary cartData={cartProducts} clearCart={clearCart} />
    </>
  );
}

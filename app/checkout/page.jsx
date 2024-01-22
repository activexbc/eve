"use client";

import { Checkout, CheckoutSummary } from "@/components";
import { getCartData } from "@/hooks/cart";
import { getUserAddresses } from "@/hooks/main";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CheckoutPage() {
  const user = useSelector((state) => state.data.user.user);
  const [addresses, setAddresses] = useState([]);
  const [addressData, setAddressData] = useState("");

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

  useEffect(() => {
    getUserAddresses(user?.uid).then((res) => setAddresses(res));
  }, [user]);

  if (!cartProducts) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Checkout
        adddresses={addresses}
        setAddressData={setAddressData}
        addressData={addressData}
      />
      <CheckoutSummary cartData={cartProducts} clearCart={clearCart} />
    </>
  );
}

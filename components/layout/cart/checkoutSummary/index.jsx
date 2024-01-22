"use client";

import { useDiscount } from "@/hooks/cart";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

export default function CheckoutSummary({ cartData, clearCart }) {
  const user = useSelector((state) => state.data.user.user);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const tax = useDiscount(totalPrice);
  const shipping = 3.99;

  console.log(user);

  useEffect(() => {
    setTotalAmount((totalPrice + tax + shipping).toFixed(2));
  }, [totalPrice, tax, shipping]);

  useEffect(() => {
    // Fetch cart data from localStorage
    // Calculate total price
    const totalPriceForCart = cartData.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotalPrice(totalPriceForCart);
  }, [cartData]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      <div className={styles.userContainer}>{user?.phoneNo}</div>
      <div className={styles.priceWrapper}>
        <p>Total Price inlc tax</p>
        <p>£{(totalPrice + tax).toFixed(2)}</p>
      </div>
      <div className={styles.priceWrapper}>
        <p>Shipping</p>
        <p>£{shipping.toFixed(2)}</p>
      </div>
      <div className={styles.priceWrapper}>
        <p>Total Price inlc tax & shipping</p>
        <p>£{totalAmount}</p>
      </div>
    </div>
  );
}

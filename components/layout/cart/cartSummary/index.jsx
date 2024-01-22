"use client";

import { useDiscount } from "@/hooks/cart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function CartSummary({ cartData, clearCart }) {
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const tax = useDiscount(totalPrice);
  const shipping = 3.99;

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
      <h3 className={styles.title}>Cart summary</h3>
      <div className={styles.fieldContainer}>
        <p className={styles.fieldText}>Price excl. tax: </p>
        <p className={styles.fieldPrice}>£{totalPrice}</p>
      </div>
      <div className={styles.fieldContainer}>
        <p className={styles.fieldText}>Tax: </p>
        <p className={styles.fieldPrice}>£{tax.toFixed(2)}</p>
      </div>
      <div className={styles.fieldContainer}>
        <p className={styles.fieldText}>Shipping: </p>
        <p className={styles.fieldPrice}>£{shipping}</p>
      </div>
      <div className={styles.fieldContainer}>
        <p className={styles.fieldText}>Total price: </p>
        <p className={styles.fieldPrice}>£{totalAmount}</p>
      </div>
      <button
        className={styles.confirmBtn}
        onClick={() => router.push("/checkout")}
      >
        Checkout
      </button>
      <button className={styles.cancelBtn} onClick={() => clearCart()}>
        Clear cart
      </button>
    </div>
  );
}

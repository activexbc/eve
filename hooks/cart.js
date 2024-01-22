"use client";

import { useEffect, useState } from "react";

export const saveToCart = (product) => {
  // Retrieve existing cart data from localStorage
  const existingCartData = JSON.parse(localStorage.getItem("cartData")) || {};

  // Check if the product already exists in the cart
  if (existingCartData[product.id]) {
    // If the product exists, increase the quantity by 1
    existingCartData[product.id].quantity += 1;
  } else {
    // If the product does not exist, add it with a quantity of 1
    existingCartData[product.id] = {
      ...product,
      quantity: 1,
    };
  }

  // Store the updated cart data back in localStorage
  localStorage.setItem("cartData", JSON.stringify(existingCartData));
};

export const getCartData = () => {
  // Retrieve cart data from localStorage
  const cartData = JSON.parse(localStorage.getItem("cartData")) || {};

  // Convert the cart data object to an array of products with quantities
  const products = Object.values(cartData).map((item) => ({
    ...item,
    quantity: item.quantity,
  }));

  return products;
};

export const removeFromCart = (productId) => {
  // Retrieve existing cart data from localStorage
  const existingCartData = JSON.parse(localStorage.getItem("cartData")) || {};

  // Check if the product exists in the cart
  if (existingCartData[productId]) {
    // Remove the product from the cart data
    delete existingCartData[productId];

    // Store the updated cart data back in localStorage
    localStorage.setItem("cartData", JSON.stringify(existingCartData));
  }
};

export const updateQuantity = (productId, change) => {
  // Retrieve existing cart data from localStorage
  const existingCartData = JSON.parse(localStorage.getItem("cartData")) || {};

  // Check if the product exists in the cart
  if (existingCartData[productId]) {
    // Update the quantity of the product
    existingCartData[productId].quantity += change;

    // If the quantity becomes zero or negative, remove the product from the cart
    if (existingCartData[productId].quantity <= 0) {
      delete existingCartData[productId];
    }

    // Store the updated cart data back in localStorage
    localStorage.setItem("cartData", JSON.stringify(existingCartData));
  }
};
export const useDiscount = (totalPrice) => {
  const [discountedPrice, setDiscountedPrice] = useState(0);

  // Calculate 20% of the total price
  const calculateDiscount = () => {
    const discountAmount = totalPrice * 0.2; // 20% of the total price
    setDiscountedPrice(discountAmount);
  };

  // Call the calculateDiscount function whenever totalPrice changes
  // This ensures that the discount is recalculated whenever the total price changes
  useEffect(() => {
    calculateDiscount();
  }, [totalPrice]);

  return discountedPrice;
};

"use client";

import { saveToCart } from "@/hooks/cart";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

export default function ListSection() {
  const router = useRouter();
  const products = useSelector((state) => state.data.products.products);

  if (!products) {
    return;
  }

  console.log(products);

  return (
    <div className={styles.container}>
      {products?.map((product) => (
        <div className={styles.productContainer} key={product.id}>
          <div
            className={styles.imgContainer}
            onClick={() => router.push(`/product/${product.id}`)}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 50px)"
            />
          </div>
          <div
            className={styles.contentContaier}
            onClick={() => router.push(`/product/${product.id}`)}
          >
            <h3 className={styles.title}>{product.name}</h3>
            <p className={styles.desc}>
              {product.desc.length > 80
                ? `${product.desc.substring(0, 80)}...`
                : product.desc}
            </p>
            <p className={styles.price}>£{product.price}</p>
          </div>
          <div className={styles.btnContainer}>
            <button
              className={styles.btn}
              onClick={(e) => {
                e.preventDefault();
                saveToCart(product);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

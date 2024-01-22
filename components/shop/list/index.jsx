"use client";

import { PageinationControls } from "@/components/layout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function ListProducts({ products, perPage, start, end }) {
  const router = useRouter();

  if (!products) {
    return;
  }

  console.log(products);

  return (
    <div className={styles.container}>
      <div className={styles.listWrapper}>
        {products.map((product) => (
          <div
            className={styles.productContainer}
            key={product.id}
            onClick={() => router.push(`/product/${product.id}`)}
          >
            <div className={styles.imgContainer}>
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 50px)"
              />
            </div>
            <div className={styles.contentContainer}>
              <h3 className={styles.productTitle}>
                {product.name.length > 80
                  ? `${product.name.substring(0, 80)}...`
                  : product.name}
              </h3>
              <p className={styles.productDescription}>
                {product.desc.length > 200
                  ? `${product.desc.substring(0, 200)}...`
                  : product.desc}
              </p>
              <div className={styles.btnContainer}>
                <p className={styles.price}>£{product.price}</p>
                <button className={styles.btn}>Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PageinationControls
        perPage={perPage}
        hasNextPage={end < products?.length}
        hasPrevPage={start > 0}
      />
    </div>
  );
}

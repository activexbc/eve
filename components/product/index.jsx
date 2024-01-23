"use client";

import Image from "next/image";
import { useState } from "react";
import ProductReviews from "./reviews";
import styles from "./styles.module.css";

export default function ProductDetails({ product }) {
  const [previewImg, setPreviewImg] = useState("");

  if (!product) {
    return <div>Loading</div>;
  }
  console.log(product);

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title1}>{product.name}</h2>
        <div className={styles.imagesContainer}>
          <div className={styles.imgContainer}>
            <Image
              src={previewImg ? previewImg : product ? product.images : ""}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 50px)"
            />
          </div>
          <div className={styles.imagesList}>
            {product?.images?.map((img, index) => (
              <div
                className={styles.smallImgContainer}
                key={index}
                onClick={() => setPreviewImg(img)}
              >
                <Image
                  src={img}
                  alt={product.name}
                  fill
                  priority
                  sizes="(min-width: 50px)"
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.contentContainer}>
          <h2 className={styles.title}>{product.name}</h2>
          <p className={styles.desc}>{product.desc}</p>
          <div className={styles.btnContainer}>
            <div className={styles.priceContainer}>
              <p className={styles.price}>£{product.price}</p>
              <p
                className={`${styles.stock} ${
                  product.stock == 0 ? styles.red : styles.green
                }`}
              >
                {product.stock == 0 ? "Out of stock" : "In stock"}
              </p>
            </div>
            <button className={styles.btn}>Add to cart</button>
          </div>
        </div>
      </div>
      <div className={styles.reviewContainer}>
        <ProductReviews reviews={product.reviews} productId={product.id} />
      </div>
    </>
  );
}

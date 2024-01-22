"use client";

import { getDataByCollection } from "@/hooks/main";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";

export default function FiltersSidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const categories = useSelector((state) => state.data.categories.categories);

  useEffect(() => {
    getDataByCollection("categories", dispatch);
  }, []);

  if (!categories) {
    return;
  }

  return (
    <div className={styles.container}>
      <div className={styles.minMaxContainer}>
        <div className={styles.minMaxWrapper}>
          <input type="number" placeholder={"Min"} className={styles.input} />
          <input type="number" placeholder={"Max"} className={styles.input} />
        </div>

        <button className={styles.minMaxBtn}>Go</button>
      </div>
      <h3 className={styles.title}>Categories</h3>
      <div className={styles.categoryContainer}>
        {categories.map((category, index) => (
          <Link
            href={`/shop?category=${category.name}`}
            key={index}
            className={styles.category}
          >
            {category.name}
          </Link>
        ))}
        <Link href={`/shop`} className={styles.category}>
          Clear Filters
        </Link>
      </div>
    </div>
  );
}

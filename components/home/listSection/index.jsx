"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ListItem from "./item";
import styles from "./styles.module.css";

export default function ListSection() {
  const router = useRouter();
  const products = useSelector((state) => state.data.products.products);
  if (!products) {
    return;
  }

  return (
    <div className={styles.container}>
      {products?.map((product) => (
        <ListItem key={product.id} product={product} />
      ))}
    </div>
  );
}

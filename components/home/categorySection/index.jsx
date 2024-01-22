"use client";

import { img } from "@/data/bannerInfo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";

export default function CategorySection() {
  const dispatch = useDispatch();
  const router = useRouter();
  const categories = useSelector((state) => state.data.categories.categories);

  if (!categories) {
    return;
  }

  return (
    <section className={styles.gridContainer}>
      {categories?.map(
        (category, index) =>
          index < 8 && (
            <div
              className={styles.gridItem}
              style={{ height: "150px" }}
              key={category.id}
              onClick={() => router.push(`/shop?category=${category.name}`)}
            >
              <div className={styles.imgContainer}>
                <Image
                  src={category ? category?.imageURL : img}
                  alt={category.name}
                  priority
                  fill
                  sizes="(max-width: 300px)"
                />
                <h3 className={styles.title}>{category?.name}</h3>
              </div>
            </div>
          )
      )}
    </section>
  );
}

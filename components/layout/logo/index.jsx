"use client";

import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function Logo({ size, btn }) {
  const router = useRouter();
  return (
    <div
      className={styles.container}
      onClick={() => (btn == "true" ? router.push("/") : null)}
    >
      <h1
        className={`${styles.title} ${
          size == "small"
            ? styles.small
            : size == "regular"
            ? styles.regular
            : size == "large"
            ? styles.large
            : size == "xLarge"
            ? styles.xLarge
            : null
        }`}
      >
        EveryBody<span className={styles.titleHighlight}>Eatz</span>
      </h1>
    </div>
  );
}

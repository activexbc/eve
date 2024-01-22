"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";

export default function PageinationControls({
  hasNextPage,
  hasPrevPage,
  perPage,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? perPage;

  return (
    <div className={styles.container}>
      <button
        disabled={!hasPrevPage}
        className={styles.btn}
        onClick={() => {
          router.push(`?page=${Number(page) - 1}&per_page=${Number(per_page)}`);
        }}
      >
        Previous
      </button>
      {page} / {Math.ceil((per_page * 2) / Number(per_page))}
      <button
        className={styles.btn}
        onClick={() => {
          router.push(`?page=${Number(page) + 1}&per_page=${Number(per_page)}`);
        }}
      >
        Next
      </button>
    </div>
  );
}

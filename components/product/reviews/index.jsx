"use client";

import { getProductReviews } from "@/hooks/main";
import { AddReview } from "@/hooks/review";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReviewItem from "./review";
import styles from "./styles.module.css";

export default function ProductReviews({ productId }) {
  const [reviewInput, setReviewInput] = useState("");
  const user = useSelector((state) => state.data.user.user);
  const [reviews, setReviews] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading == false) {
      getProductReviews(productId).then((res) => {
        setReviews(res);
      });
    }
  }, [loading, productId]);

  const handleSubmit = (e) => {
    setLoading(true);
    AddReview(productId, reviewInput, user.uid).then(() => {
      setLoading(false);
      setReviewInput("");
    });
  };

  return (
    <div className={styles.container}>
      {user && (
        <div className={styles.addContainer}>
          <h3 className={styles.addTitle}>Add a review</h3>
          <textarea
            name="reviews"
            className={styles.textarea}
            placeholder="Write a review"
            value={reviewInput}
            onChange={(e) => setReviewInput(e.target.value)}
          />
          <button className={styles.addBtn} onClick={handleSubmit}>
            Add review
          </button>
        </div>
      )}

      {reviews.length == 0 ? (
        <h1>No reviews</h1>
      ) : (
        <>
          {reviews.map((item) => (
            <ReviewItem
              item={item}
              key={item.id}
              productId={productId}
              setLoading={setLoading}
            />
          ))}
        </>
      )}
    </div>
  );
}

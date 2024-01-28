"use client";
import { addReviewComment, getReviewCommentsById } from "@/hooks/review";
import { useEffect, useState } from "react";
import CommentItem from "./item";
import styles from "./styles.module.css";

export default function ReviewComment({
  openComment,
  currentUser,
  productId,
  itemId,
  setLoading,
}) {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  const handleAddComment = () => {
    setLoading(true);
    addReviewComment(productId, currentUser?.uid, itemId, comment).then(() =>
      setLoading(false)
    );
  };

  useEffect(() => {
    getReviewCommentsById(productId, itemId).then((res) => {
      setCommentsList(res);
    });
  }, [itemId, productId]);
  return (
    <div className={styles.wrapper}>
      {openComment == true && (
        <div className={styles.commentContainer}>
          <>
            {currentUser && (
              <div className={styles.addCommentContainer}>
                <div className={styles.inputContainer}>
                  <textarea
                    type={"text"}
                    placeholder={"Write your comment"}
                    multiple
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={styles.input}
                  />
                  <button
                    className={styles.addCommentBtn}
                    onClick={handleAddComment}
                  >
                    Reply
                  </button>
                </div>
              </div>
            )}
            <div className={styles.commentsWrapper}>
              {commentsList?.map((item) => (
                <CommentItem key={item.id} item={item} />
              ))}
            </div>
          </>
        </div>
      )}
    </div>
  );
}

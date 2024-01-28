"use client";

import { getUserById } from "@/hooks/auth";
import {
  addReviewLike,
  isUserLiked,
  removeReview,
  removeReviewLike,
} from "@/hooks/review";
import { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import ReviewComment from "./comment";
import styles from "./styles.module.css";

export default function ReviewItem({ item, productId, setLoading }) {
  const currentUser = useSelector((state) => state.data.user.user);
  const [like, setLike] = useState(false);
  const [user, setUser] = useState({});
  const [openComment, setOpenComment] = useState(false);

  const handleClick = (e) => {
    if (like == false) {
      setLoading(true);
      addReviewLike(productId, currentUser?.uid, item.id, setLike).then(() =>
        setLoading(false)
      );
    } else {
      setLoading(true);
      removeReviewLike(productId, currentUser?.uid, item.id, setLike).then(() =>
        setLoading(false)
      );
    }
  };

  useEffect(() => {
    getUserById(item.userId).then((res) => setUser(res));
  }, [item]);

  useEffect(() => {
    if (user && currentUser) {
      isUserLiked(productId, currentUser?.uid, item.id, setLike);
    }
  }, [setLike, user, productId, currentUser, item.id]);

  return (
    <div className={styles.container}>
      <div className={styles.userContainer}>
        <p>{user?.fName}</p>
        <p>{user?.lName}</p>
        <span className={styles.likes}>
          {item.likes} {item.likes == 1 ? "like" : "likes"}
        </span>
      </div>
      <p className={styles.review}>{item.review}</p>
      <div className={styles.btnsContainer}>
        {user?.role != "admin" || user?.uid == currentUser?.uid ? (
          <>
            {currentUser && (
              <>
                <button
                  className={styles.btnContainer}
                  onClick={() => {
                    setLoading(true);
                    removeReview(productId, item.id).then(() =>
                      setLoading(false)
                    );
                  }}
                >
                  <MdDelete className={styles.icon} />
                  <p>Remove</p>
                </button>
                <button className={styles.btnContainer}>
                  <MdEdit className={styles.icon} />
                  <p>Edit</p>
                </button>
              </>
            )}
          </>
        ) : null}
        {currentUser && (
          <button className={styles.btnContainer} onClick={handleClick}>
            <div
              className={`${styles.heart} ${
                like == true ? styles.heartAnimation : null
              }`}
            />
            <p>Like</p>
          </button>
        )}

        <button
          className={styles.btnContainer}
          onClick={() =>
            openComment == true ? setOpenComment(false) : setOpenComment(true)
          }
        >
          <FaRegComment className={styles.icon} />
          <p>Comments</p>
        </button>
      </div>
      <ReviewComment
        openComment={openComment}
        currentUser={currentUser}
        itemId={item.id}
        productId={productId}
        setLoading={setLoading}
      />
    </div>
  );
}

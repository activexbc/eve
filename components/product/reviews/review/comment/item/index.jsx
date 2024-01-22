"use client";

import { getUserById } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

export default function CommentItem({ item }) {
  const currentUser = useSelector((state) => state.data.user.user);
  const [user, setUser] = useState({});
  const [like, setLike] = useState(false);
  useEffect(() => {
    if (item) {
      getUserById(item.userId).then((res) => {
        setUser(res);
      });
    }
  }, [item]);

  return (
    <div className={styles.container}>
      <div className={styles.userContainer}>
        <p>{user.fName}</p>
        <p>{user.lName}:</p>
        <p> 0 Likes</p>
      </div>
      <div className={styles.commentContainer}>
        <p>{item.comment}</p>
      </div>
      <div className={styles.btnsContainer}>
        {user?.role != "admin" || user?.uid == currentUser?.uid ? (
          <>
            {currentUser?.uid && (
              <>
                <button className={styles.btnContainer}>
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
        {currentUser?.uid && (
          <button className={styles.btnContainer}>
            {like == true ? (
              <FaHeart className={styles.icon} />
            ) : like == false ? (
              <FaRegHeart className={styles.icon} />
            ) : null}
            <p>Like</p>
          </button>
        )}

        <button className={styles.btnContainer}>
          <FaRegComment className={styles.icon} />
          <p>Reply</p>
        </button>
      </div>
    </div>
  );
}

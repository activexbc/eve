"use client";

import { PageinationControls } from "@/components/layout";
import { addCategory, removeDoc } from "@/hooks/admin";
import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.css";

export default function AdminListCategories({
  categories,
  perPage,
  start,
  end,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [previewURL, setPreviewURL] = useState(null);
  const [img, setImg] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImg(file);
      setPreviewURL(imageURL);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    addCategory(category, img);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button
          className={styles.addBtn}
          onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
        >
          {isOpen ? "Close" : "Add a category"}
        </button>
        {isOpen && (
          <div className={styles.addContainer}>
            {previewURL && (
              <div className={styles.imgContainer}>
                <Image src={previewURL} alt={"img"} fill />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className={styles.input}
              onChange={handleImageChange}
              required={true}
            />
            <input
              className={styles.input}
              placeholder="Add a category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button className={styles.finishBtn} onClick={handleClick}>
              Add
            </button>
          </div>
        )}
        {categories && (
          <>
            {categories?.map((category) => (
              <div className={styles.categoryContainer} key={category.id}>
                <div className={styles.leftContainer}>
                  <div className={styles.imgContainer}>
                    <Image
                      src={category.imageURL}
                      alt={category.name}
                      fill
                      priority
                      sizes="(min-width: 50px)"
                    />
                  </div>
                  <p className={styles.name}>{category.name}</p>
                </div>
                <button
                  className={styles.deleteBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    removeDoc(category.id, category.imageURL, "categories");
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </>
        )}
        <PageinationControls
          perPage={perPage}
          hasNextPage={end < categories?.length}
          hasPrevPage={start > 0}
        />
      </div>
    </div>
  );
}

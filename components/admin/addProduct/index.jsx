"use client";

import { addPostWithImages } from "@/hooks/admin";
import { getDataByCollection } from "@/hooks/main";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";

export default function AdminAddProduct() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [previewURL, setPreviewURL] = useState(null);
  const [images, setImages] = useState([]);

  const categories = useSelector((state) => state.data.categories.categories);

  useEffect(() => {
    getDataByCollection("categories", dispatch);
  }, []);

  if (!categories) {
    return;
  }

  const inputs = [
    {
      id: 1,
      name: "Product Name",
      type: "text",
      value: name,
      onChange: (e) => setName(e.target.value),
    },
    {
      id: 2,
      name: "Product Description",
      type: "text",
      value: desc,
      onChange: (e) => setDesc(e.target.value),
    },
    {
      id: 3,
      name: "Product Stock",
      type: "text",
      value: price,
      onChange: (e) => setPrice(e.target.value),
    },
    {
      id: 4,
      name: "Product Price",
      type: "text",
      value: stock,
      onChange: (e) => setStock(e.target.value),
    },
  ];

  const handleFileInputChange = (event) => {
    const selectedImages = event.target.files;
    const imagesArray = Array.from(selectedImages);

    setImages(imagesArray);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    addPostWithImages(name, desc, category, price, stock, images);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add a Product</h1>
      <div className={styles.form}>
        {/* {img && (
          <div className={styles.imgContainer}>
            <Image src={previewURL} alt={"img"} fill />
          </div>
        )} */}

        <input
          type="file"
          accept="image/*"
          multiple
          className={styles.imgInput}
          onChange={handleFileInputChange}
          required={true}
        />
        {inputs.map((input) => (
          <input
            key={input.id}
            placeholder={input.name}
            value={input.value}
            onChange={input.onChange}
            type={input.type}
            className={styles.input}
            required={true}
          />
        ))}
        <select
          className={styles.dropDown}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories?.map((category, index) => (
            <option key={index}>{category?.name}</option>
          ))}
        </select>
        <button className={styles.btn} onClick={handleClick}>
          Add
        </button>
      </div>
    </div>
  );
}

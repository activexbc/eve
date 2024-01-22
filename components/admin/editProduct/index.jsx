"use client";

import { updateProduct } from "@/hooks/admin";
import { getDataByCollection } from "@/hooks/main";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";

export default function AdminEditProduct({ product, id }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [previewURL, setPreviewURL] = useState(null);

  const categories = useSelector((state) => state.data.categories.categories);

  useEffect(() => {
    getDataByCollection("categories", dispatch);
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDesc(product.desc);
      setImg(product.imageURL);
      setPreviewURL(product.imageURL);
      setCategory(product.category);
      setPrice(product.price);
      setStock(product.stock);
    }
  }, [product]);

  if (!categories) {
    return;
  }

  const inputs = [
    {
      id: 1,
      name: "Product Name",
      type: "text",
      value: name ? name : "",
      onChange: (e) => setName(e.target.value),
    },
    {
      id: 2,
      name: "Product Description",
      type: "text",
      value: desc ? desc : "",
      onChange: (e) => setDesc(e.target.value),
    },
    {
      id: 3,
      name: "Product Price",
      type: "text",
      value: price ? price : "",
      onChange: (e) => setPrice(e.target.value),
    },
    {
      id: 4,
      name: "Product Stock",
      type: "text",
      value: stock ? stock : "",
      onChange: (e) => setStock(e.target.value),
    },
  ];

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
    updateProduct(id, name, desc, category, price, stock, img);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Product</h1>
      <div className={styles.form}>
        <input
          type="file"
          accept="image/*"
          className={styles.imgInput}
          onChange={handleImageChange}
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
          Update Product
        </button>
      </div>
    </div>
  );
}

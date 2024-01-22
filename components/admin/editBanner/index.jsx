"use client";

import { editBanner } from "@/hooks/main";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./styles.module.css";

export default function AdminEditBanner({ defaultInfo }) {
  const dispatch = useDispatch();

  const [img, setImg] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [mText, setMText] = useState("");
  const [sText, setSText] = useState("");
  const [btn, setBtn] = useState({ path: "", name: "" });

  useEffect(() => {
    if (defaultInfo) {
      setPreviewURL(defaultInfo.imageURL);
      setMText(defaultInfo.mainText);
      setSText(defaultInfo.subText);
      setBtn({
        path: defaultInfo.btn?.path,
        name: defaultInfo.btn?.name,
      });
    }
  }, [defaultInfo]);

  if (!defaultInfo) {
    return;
  }

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
    editBanner(img, mText, sText, btn);
  };

  const inputs = [
    {
      id: 1,
      type: "text",
      name: "Main Text",
      value: mText,
      onChange: (e) => setMText(e.target.value),
    },
    {
      id: 2,
      type: "text",
      name: "Sub Text",
      value: sText,
      onChange: (e) => setSText(e.target.value),
    },
    {
      id: 3,
      type: "text",
      name: "Button Name",
      value: btn.name,
      onChange: (e) =>
        setBtn({ path: btn.path ? btn.path : null, name: e.target.value }),
    },
    {
      id: 4,
      type: "text",
      name: "Button Path",
      value: btn.path,
      onChange: (e) =>
        setBtn({ name: btn.name ? btn.name : null, path: e.target.value }),
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit banner info</h1>
      <div className={styles.wrapper}>
        {previewURL && (
          <div className={styles.imgContainer}>
            <Image
              src={previewURL}
              alt={"img"}
              fill
              priority
              sizes="(min-width: 50px)"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className={styles.input}
          onChange={handleImageChange}
          required={true}
        />
        {inputs.map((input) => (
          <input
            key={input.id}
            type={input.type}
            value={input.value ? input.value : ""}
            placeholder={input.name}
            onChange={input.onChange}
            className={styles.input}
            required={true}
          />
        ))}
        <button className={styles.btn} onClick={handleClick}>
          Update
        </button>
      </div>
    </div>
  );
}

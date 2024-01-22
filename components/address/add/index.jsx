"use client";

import { addAddress } from "@/hooks/main";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./styles.module.css";

export default function UserAddAddress({ id }) {
  const router = useRouter();
  const [street, setStreet] = useState("");
  const [street2, setStreet2] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState("");

  const handleClick = (e) => {
    e.preventDefault();

    addAddress(id, street, street2, postCode, city, country).then(() => {
      router.push(`/user/${id}/addresses`);
    });
  };

  const inputs = [
    {
      id: 1,
      name: "Address",
      type: "text",
      value: street ? street : "",
      onChange: (e) => setStreet(e.target.value),
    },
    {
      id: 2,
      name: "Address 2",
      type: "text",
      value: street2 ? street2 : "",
      onChange: (e) => setStreet2(e.target.value),
    },
    {
      id: 3,
      name: "Post Code",
      type: "text",
      value: postCode ? postCode : "",
      onChange: (e) => setPostCode(e.target.value),
    },
    {
      id: 4,
      name: "City",
      type: "text",
      value: city ? city : "",
      onChange: (e) => setCity(e.target.value),
    },
    {
      id: 5,
      name: "Country",
      type: "text",
      value: country ? country : "",
      onChange: (e) => setCountry(e.target.value),
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add a address</h1>
      <div className={styles.form}>
        {inputs.map((input) => (
          <input
            key={input.id}
            placeholder={input.name}
            value={input?.value}
            onChange={input.onChange}
            type={input.type}
            className={styles.input}
            required={true}
          />
        ))}

        <button className={styles.btn} onClick={handleClick}>
          Add
        </button>
      </div>
    </div>
  );
}

"use client";

import { updateUser } from "@/hooks/admin";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function AdminEditUser({ user }) {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("False");

  useEffect(() => {
    if (user) {
      setFName(user.fName);
      setLName(user.lName);
      setEmail(user.email);
      setIsAdmin(user.role == "user" ? "False" : "True");
    }
  }, [user]);

  const handleClick = (e) => {
    e.preventDefault();
    updateUser(user.uid, fName, lName, email, isAdmin);
  };

  const inputs = [
    {
      id: 1,
      type: "text",
      name: "First Name",
      value: fName,
      onchange: (e) => setFName(e.target.value),
    },
    {
      id: 2,
      type: "text",
      name: "Last Name",
      value: lName,
      onchange: (e) => setLName(e.target.value),
    },
    {
      id: 3,
      type: "email",
      name: "Email",
      value: email,
      onchange: (e) => setEmail(e.target.value),
    },
  ];

  if (!user) {
    return;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit User</h1>
      <div className={styles.wrapper}>
        {inputs.map((input) => (
          <input
            key={input.id}
            placeholder={input.name}
            type={input.type}
            value={input.value}
            onChange={input.onchange}
            className={styles.input}
          />
        ))}
        <div className={styles.isAdminContainer}>
          <p className={styles.text}>Is admin?</p>
          <select
            onChange={(e) => setIsAdmin(e.target.value)}
            defaultValue={"True"}
          >
            <option>False</option>
            <option>True</option>
          </select>
        </div>
        <button onClick={handleClick} className={styles.btn}>
          Update User
        </button>
      </div>
    </div>
  );
}

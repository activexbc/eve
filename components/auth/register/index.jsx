"use client";

import { createUser } from "@/hooks";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

export default function Register() {
  const user = useSelector((state) => state.data.user.user);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (user) {
    redirect("/");
  }

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
    {
      id: 4,
      type: "password",
      name: "Password",
      value: password,
      onchange: (e) => setPassword(e.target.value),
    },
    {
      id: 5,
      type: "password",
      name: "Confirm Password",
      value: confirmPassword,
      onchange: (e) => setConfirmPassword(e.target.value),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    createUser(email, password, fName, lName);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <p className={styles.welcomeText}>
        Hello, create an account to get started
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <input
            key={input.id}
            type={input.type}
            placeholder={input.name}
            value={input.value}
            onChange={input.onchange}
            className={`${styles.input} `}
          />
        ))}
        <div className={styles.formBottomContainer}>
          <button type={"submit"} className={styles.btn}>
            Register
          </button>
        </div>
        <div className={styles.authTextContainer}>
          <p className={styles.authText}>Already have an account?</p>
          <Link className={styles.authTextHighlight} href={"/signin"}>
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

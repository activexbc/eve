"use client";

import { signinUser } from "@/hooks/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

export default function Signin() {
  const user = useSelector((state) => state.data.user.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    redirect("/");
  }

  const inputs = [
    {
      id: 1,
      type: "email",
      name: "Email",
      value: email,
      onchange: (e) => setEmail(e.target.value),
    },
    {
      id: 2,
      type: "password",
      name: "Password",
      value: password,
      onchange: (e) => setPassword(e.target.value),
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    signinUser(email, password);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign in</h1>
      <p className={styles.welcomeText}>Welcome back, sign in to continue</p>
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
            Sign in
          </button>
          <Link className={styles.forgotPassword} href={"/forgottenpassword"}>
            Forgot your password?
          </Link>
        </div>
        <div className={styles.authTextContainer}>
          <p className={styles.authText}>Dont have an account?</p>
          <Link className={styles.authTextHighlight} href={"/register"}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

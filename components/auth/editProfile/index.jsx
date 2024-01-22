"use client";

import { updateUser } from "@/hooks/admin";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function EditProfile({ user }) {
  const router = useRouter();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  useEffect(() => {
    if (user) {
      setFName(user.fName);
      setLName(user.lName);
      setEmail(user.email);
      setPhoneNo(user?.phoneNo);
    }
  }, [user]);

  const handleClick = (e) => {
    e.preventDefault();
    updateUser(user.uid, fName, lName, email, phoneNo);
    router.replace(`/user/${user.uid}/edit`);
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
    {
      id: 4,
      type: "test",
      name: "Phone Number",
      value: phoneNo,
      onchange: (e) => setPhoneNo(e.target.value),
    },
  ];

  if (!user) {
    return;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Profile</h1>
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
        <button onClick={handleClick} className={styles.btn}>
          Save
        </button>
      </div>
    </div>
  );
}

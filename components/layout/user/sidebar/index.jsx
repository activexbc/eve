"use client";

import { getUserById, signoutUser } from "@/hooks/auth";
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiLock } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";

export default function UserSidebar() {
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.data.user.user);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserById(params.id).then((res) => setUserData(res));
  }, [params.id]);
  const links = [
    {
      id: 1,
      name: "Orders",
      path: `/user/${userData?.uid}/orders`,
    },
    {
      id: 2,
      name: "Addresses",
      path: `/user/${userData?.uid}/addresses`,
    },
  ];

  if (!user) {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.nameContainer}>
        <p>{userData?.fName}</p>
        <p>{userData?.lName}</p>
      </div>
      <div className={styles.emailContainer}>
        {userData?.role == "user" ? null : (
          <CiLock className={styles.adminIcon} />
        )}
        <p className={styles.email}>{userData?.email}</p>
      </div>
      {user?.uid == userData?.uid ? (
        <>
          <button
            className={styles.editBtn}
            onClick={() => router.push(`/user/${userData.uid}/edit`)}
          >
            Edit Profile
          </button>
          <button
            className={styles.logoutBtn}
            onClick={() => {
              signoutUser(dispatch);
              router.push("/");
            }}
          >
            Logout
          </button>
        </>
      ) : null}
      {user?.role == "admin" ? (
        <Link href="/admin/dashboard">Admin Dashboard</Link>
      ) : null}

      {links.map((link) => (
        <Link href={link.path} key={link.id} className={styles.link}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}

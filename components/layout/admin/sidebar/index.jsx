"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

export default function AdminSidebar() {
  const user = useSelector((state) => state.data.user.user);

  const links = [
    {
      id: 1,
      name: "Edit Banner",
      path: "/admin/editBanner",
    },
    {
      id: 2,
      name: "List all users",
      path: "/admin/users",
    },
    {
      id: 3,
      name: "List products",
      path: "/admin/products",
    },
    {
      id: 4,
      name: "List all categories",
      path: "/admin/categories",
    },
    {
      id: 5,
      name: "Add a product",
      path: "/admin/products/add",
    },
  ];

  if (user?.role == "user") {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      {links.map((link) => (
        <Link href={link.path} key={link.id}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}

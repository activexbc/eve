"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../../searchBar";
import styles from "./styles.module.css";

export default function NavbarLinks() {
  const user = useSelector((state) => state.data.user.user);
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const rootLinks = [
    {
      id: 1,
      name: "Shop",
      path: "/shop",
    },
    {
      id: 2,
      name: "Cart",
      path: "/cart",
    },
    {
      id: 3,
      name: "Sign in",
      path: "/signin",
    },
    {
      id: 4,
      name: "Register",
      path: "/register",
    },
  ];

  const userLinks = [
    {
      id: 1,
      name: "Shop",
      path: "/shop",
    },
    {
      id: 2,
      name: "Cart",
      path: "/cart",
    },
    {
      id: 3,
      name: "Account",
      path: `/user/${user?.uid}/orders`,
    },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  return (
    <div className={styles.navbarContainer}>
      <button
        className={`${styles.navbarToggler} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      >
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </button>
      <ul className={`${styles.navbarMenu} ${isOpen ? styles.open : ""}`}>
        {isOpen ? (
          <div className={styles.searchWrapper}>
            <SearchBar />
          </div>
        ) : null}
        {user ? (
          <>
            {userLinks.map((link) => (
              <Link href={link.path} key={link.id} className={styles.link}>
                {link.name}
              </Link>
            ))}
          </>
        ) : (
          <>
            {rootLinks.map((link) => (
              <Link href={link.path} key={link.id} className={styles.link}>
                {link.name}
              </Link>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}

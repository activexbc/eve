"use client";

import { ListenForUser } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Logo } from "..";
import SearchBar from "../searchBar";
import NavbarLinks from "./links";
import styles from "./styles.module.css";

export default function Navbar() {
  const disaptch = useDispatch();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    ListenForUser(disaptch);
  }, [disaptch]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${searchInput}`);
  };

  return (
    <div className={styles.container}>
      <Logo btn={"true"} size={"large"} />
      <div className={styles.searchWrapper}>
        <SearchBar
          state={searchInput}
          setState={setSearchInput}
          maxWidth={true}
          onClick={handleSearch}
        />
      </div>
      <NavbarLinks />
    </div>
  );
}

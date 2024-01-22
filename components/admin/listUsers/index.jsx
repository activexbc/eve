"use client";

import { PageinationControls } from "@/components/layout";
import SearchBar from "@/components/layout/searchBar";
import { searchUserByUsername } from "@/hooks/main";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { FaRegAddressBook, FaShippingFast } from "react-icons/fa";
import styles from "./styles.module.css";

export default function AdminListUsers({ users, perPage, start, end }) {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    searchUserByUsername(search).then((res) => setSearchData(res));
  }, [search]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List users</h1>
      <div className={styles.wrapper}>
        <SearchBar
          placeholder={"Search users"}
          state={search}
          setState={setSearch}
        />
        {searchData.length > 0
          ? searchData.map((user) => (
              <div className={styles.userContainer} key={user.uid}>
                <div className={styles.userWrapper}>
                  <div className={styles.nameContainer}>
                    <p className={styles.name}>{user.fName}</p>
                    <p className={styles.name}>{user.lName}</p>
                  </div>
                  <p className={styles.email}>{user.email}</p>
                  <p className={styles.email}>{user.uid}</p>
                </div>
                <div className={styles.btnsContainer}>
                  <Link
                    href={`/admin/user/${user.uid}/addresses`}
                    className={styles.btn}
                  >
                    <FaRegAddressBook className={styles.icon} />
                  </Link>
                  <Link
                    href={`/admin/user/${user.uid}/orders`}
                    className={styles.btn}
                  >
                    <FaShippingFast className={styles.icon} />
                  </Link>
                  <Link
                    href={`/admin/user/${user.uid}/edit`}
                    className={styles.btn}
                  >
                    <CiSettings className={styles.icon} />
                  </Link>
                </div>
              </div>
            ))
          : users?.map((user) => (
              <div className={styles.userContainer} key={user.uid}>
                <div className={styles.userWrapper}>
                  <div className={styles.nameContainer}>
                    <p className={styles.name}>{user.fName}</p>
                    <p className={styles.name}>{user.lName}</p>
                  </div>
                  <p className={styles.email}>{user.email}</p>
                  <p className={styles.email}>{user.uid}</p>
                </div>
                <div className={styles.btnsContainer}>
                  <Link
                    href={`/admin/user/${user.uid}/addresses`}
                    className={styles.btn}
                  >
                    <FaRegAddressBook className={styles.icon} />
                  </Link>
                  <Link
                    href={`/admin/user/${user.uid}/orders`}
                    className={styles.btn}
                  >
                    <FaShippingFast className={styles.icon} />
                  </Link>
                  <Link
                    href={`/admin/user/${user.uid}/edit`}
                    className={styles.btn}
                  >
                    <CiSettings className={styles.icon} />
                  </Link>
                </div>
              </div>
            ))}
      </div>
      <PageinationControls
        perPage={perPage}
        hasNextPage={end < users?.length}
        hasPrevPage={start > 0}
      />
    </div>
  );
}

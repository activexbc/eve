"use client";
import { PageinationControls } from "@/components/layout";
import SearchBar from "@/components/layout/searchBar";
import { removeDoc } from "@/hooks/admin";
import { searchProducts } from "@/hooks/main";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDeleteForever, MdOutlineModeEdit, MdPreview } from "react-icons/md";
import styles from "./styles.module.css";

export default function AdminListProducts({ products, perPage, start, end }) {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    searchProducts(search).then((res) => setSearchData(res));
  }, [search]);

  if (!products) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List Products</h1>
      <div className={styles.wrapper}>
        <SearchBar
          placeholder={"Search products"}
          state={search}
          setState={setSearch}
        />

        {searchData.length > 0
          ? searchData.map((product) => (
              <div className={styles.productContainer} key={product.id}>
                <div className={styles.imgContainer}>
                  <Image
                    src={product?.images[0] ? product.images[0] : ""}
                    alt={product.name}
                    priority
                    sizes="(min-width: 50px)"
                    fill
                  />
                </div>
                <div className={styles.contentContainer}>
                  <h3 className={styles.productTitle}>{product.name}</h3>
                  <p className={styles.desc}>
                    {product.desc.length > 100
                      ? `${product.desc.substring(0, 100)}...`
                      : product.desc}
                  </p>

                  <p>Price: £{product.price}</p>
                  <p>Stock: {product.stock}</p>
                </div>
                <div className={styles.btnsContainer}>
                  <Link
                    href={`/admin/product/${product.id}/edit`}
                    className={styles.btn}
                  >
                    <MdOutlineModeEdit className={styles.icon} />
                  </Link>
                  <button
                    className={styles.btn}
                    onClick={(e) => {
                      e.preventDefault();
                      removeDoc(product.id, product.imageURL, "products");
                      router.push("/admin/products");
                    }}
                  >
                    <MdDeleteForever className={styles.icon} />
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    <MdPreview className={styles.icon} />
                  </button>
                </div>
              </div>
            ))
          : products?.map((product) => (
              <div className={styles.productContainer} key={product.id}>
                <div className={styles.imgContainer}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    priority
                    sizes="(min-width: 50px)"
                    fill
                  />
                </div>
                <div className={styles.contentContainer}>
                  <h3 className={styles.productTitle}>{product.name}</h3>
                  <p className={styles.desc}>
                    {product.desc.length > 100
                      ? `${product.desc.substring(0, 100)}...`
                      : product.desc}
                  </p>

                  <p>Price: £{product.price}</p>
                  <p>Stock: {product.stock}</p>
                </div>
                <div className={styles.btnsContainer}>
                  <Link
                    href={`/admin/product/${product.id}/edit`}
                    className={styles.btn}
                  >
                    <MdOutlineModeEdit className={styles.icon} />
                  </Link>
                  <button
                    className={styles.btn}
                    onClick={(e) => {
                      e.preventDefault();
                      removeDoc(product.id, product.imageURL, "products");
                      router.push("/admin/products");
                    }}
                  >
                    <MdDeleteForever className={styles.icon} />
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    <MdPreview className={styles.icon} />
                  </button>
                </div>
              </div>
            ))}
        <PageinationControls
          perPage={perPage}
          hasNextPage={end < products?.length}
          hasPrevPage={start > 0}
        />
      </div>
    </div>
  );
}

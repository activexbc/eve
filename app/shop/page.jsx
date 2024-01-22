"use client";

import { ListProducts } from "@/components";
import {
  getDataByCategory,
  getDataByCollection,
  mainSearch,
} from "@/hooks/main";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ShopPage({ searchParams }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products.products);
  const perPage = 18;

  const category = searchParams["category"] || null;
  const search = searchParams["search"] || null;

  console.log(category);

  useEffect(() => {
    if (category) {
      getDataByCategory(category, dispatch);
    } else if (search) {
      mainSearch(search, dispatch);
    } else {
      getDataByCollection("products", dispatch);
    }
  }, [category, dispatch, search]);

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? perPage;

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const entries = products?.slice(start, end);

  return (
    <ListProducts
      products={entries}
      perPage={perPage}
      start={start}
      end={end}
    />
  );
}

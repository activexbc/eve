"use client";

import { AdminListProducts } from "@/components";
import { getDataByCollection } from "@/hooks/main";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminListProductsPage({ searchParams }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products.products);
  const perPage = 10;

  useEffect(() => {
    getDataByCollection("products", dispatch);
  }, []);

  if (!products) {
    return;
  }

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? perPage;

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const entries = products.slice(start, end);

  return (
    <AdminListProducts
      products={entries}
      perPage={perPage}
      start={start}
      end={end}
    />
  );
}

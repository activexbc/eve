"use client";

import { AdminListCategories } from "@/components";
import { getDataByCollection } from "@/hooks/main";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminCategoriesPage({ searchParams }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.data.categories.categories);
  const perPage = 20;

  useEffect(() => {
    getDataByCollection("categories", dispatch);
  }, []);

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? perPage;

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const entries = categories?.slice(start, end);

  return (
    <AdminListCategories
      categories={entries}
      perPage={perPage}
      start={start}
      end={end}
    />
  );
}

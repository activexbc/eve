"use client";

import { AdminListUsers } from "@/components";
import { getDataByCollection } from "@/hooks/main";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminListUsersPage({ searchParams }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.data.users.users);
  const perPage = 10;

  useEffect(() => {
    getDataByCollection("users", dispatch);
  }, []);

  if (!users) {
    return;
  }

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? perPage;

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const entries = users.slice(start, end);

  return (
    <AdminListUsers users={entries} perPage={perPage} start={start} end={end} />
  );
}

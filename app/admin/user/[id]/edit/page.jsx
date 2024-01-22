"use client";

import { AdminEditUser } from "@/components";
import { getUserById } from "@/hooks/auth";
import { useEffect, useState } from "react";

export default function AdminEditUserPage(params) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserById(params.params.id).then((res) => setUser(res));
  }, []);

  return <AdminEditUser user={user} />;
}

"use client";

import { EditProfile } from "@/components";
import { getUserById } from "@/hooks/auth";
import { useEffect, useState } from "react";

export default function UserEditDetails(params) {
  const [user, setUser] = useState({});

  console.log(user);

  useEffect(() => {
    getUserById(params.params.id).then((res) => setUser(res));
  }, []);
  return <EditProfile user={user} />;
}

"use client";

import { UserListAddresses } from "@/components";
import { getUserAddresses } from "@/hooks/main";
import { useEffect, useState } from "react";

export default function UserAddressesPage({ params }) {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getUserAddresses(params.id).then((res) => setAddresses(res));
  }, []);

  return <UserListAddresses id={params.id} addresses={addresses} />;
}

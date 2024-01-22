"use client";

import { AdminListAddresses } from "@/components";
import { getUserAddresses } from "@/hooks/main";
import { useEffect, useState } from "react";

export default function AdminUserAddressesPage({ params }) {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getUserAddresses(params.id).then((res) => setAddresses(res));
  }, []);

  if (!addresses) {
    return;
  }

  return <AdminListAddresses addresses={addresses} />;
}

"use client";

import { AdminEditBanner } from "@/components";
import { getBannerInfo } from "@/hooks/main";
import { useEffect, useState } from "react";

export default function AdminEditBannerPage() {
  const [defaultInfo, setDefaultInfo] = useState({});

  useEffect(() => {
    getBannerInfo().then((res) => setDefaultInfo(res));
  }, []);

  return <AdminEditBanner defaultInfo={defaultInfo} />;
}

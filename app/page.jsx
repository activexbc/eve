"use client";

import { CategorySection, HeroSection, ListSection } from "@/components";
import { getBannerInfo, getDataByCollection } from "@/hooks/main";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const [bannerInfo, setBannerInfo] = useState({});
  useEffect(() => {
    getDataByCollection("categories", dispatch);
    getDataByCollection("products", dispatch);
    getBannerInfo().then((res) => setBannerInfo(res));
  }, []);

  if (!bannerInfo.imageURL) {
    return <div>Loading</div>;
  }

  return (
    <main>
      <HeroSection bannerInfo={bannerInfo} />
      <CategorySection />
      <ListSection />
    </main>
  );
}

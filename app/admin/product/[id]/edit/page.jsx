"use client";

import { AdminEditProduct } from "@/components";
import { getProductById } from "@/hooks/main";
import { useEffect, useState } from "react";

export default function AdminEditProductPage({ params }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductById(params.id).then((res) => setProduct(res));
  }, []);

  if (!product) {
    return;
  }

  return <AdminEditProduct product={product} id={params.id} />;
}

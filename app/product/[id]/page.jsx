"use client";

import { ProductDetails } from "@/components";
import { getProductById } from "@/hooks/main";
import { useEffect, useState } from "react";

export default function ProductPage({ params }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductById(params.id).then((res) => setProduct(res));
  }, []);

  if (!product) {
    return;
  }

  return <ProductDetails product={product} />;
}

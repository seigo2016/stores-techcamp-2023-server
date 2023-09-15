"use client";

import { useUserContext } from "@/contexts";
import { Product } from "@/models";
import { getRecommendedProducts } from "@/usecases";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Recoomend() {
  const { user } = useUserContext();
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  useEffect(() => {
    getRecommendedProducts(user.id).then(setRecommendedProducts);
  });

  return (
    <div className="w-full h-full py-[40px] overflow-y-scroll flex flex-col items-center gap-[32px]">
      {recommendedProducts.map((recommendedProduct) => {
        return (
          <div
            key={recommendedProduct.id}
            className="w-[calc(240px_+_24px)] p-[12px] flex flex-col gap-[12px] border-[1px] border-[#8E8E8E]  shadow-[0_1px_4px_0_rgba(0,0,0,1)] rounded-[8px]"
          >
            <Image
              src={recommendedProduct.url}
              alt={recommendedProduct.name}
              width={240}
              height={240}
            />
            <div className="flex flex-col gap-[4px]">
              <div>{recommendedProduct.name}</div>
              <div className="text-right">¥{recommendedProduct.price}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

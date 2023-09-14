"use client";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/models";
import { useOrderState, useTotalPriceState } from "@/globalStates";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProducts } from "@/usecases";

export default function PageProduct() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const { order, initOrder, addOrderedProduct } = useOrderState();
  const totalPrice = useTotalPriceState();

  useEffect(() => {
    initOrder();
  }, []);

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  const onClickProduct = (product: Product) => {
    addOrderedProduct(product);
  };

  const buy = () => {
    if (order.orderedProducts.length === 0) return;
    router.push("/point");
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="flex-auto p-[32px] flex flex-row flex-wrap content-start gap-[20px] overflow-y-scroll">
        {products.map((product, i) => {
          return (
            <ProductCard
              key={i}
              name={product.name}
              price={product.price}
              url={product.url}
              onClick={() => onClickProduct(product)}
            />
          );
        })}
      </div>
      <div className="flex-none w-[2px] h-full py-[20px]">
        <div className="h-full bg-[#afafaf]"></div>
      </div>
      <div className="flex-none w-[360px] flex flex-col justify-between p-[20px]">
        <div>
          {order.orderedProducts.map((orderedProduct, i) => {
            return (
              <div
                key={i}
                className="w-full flex justify-between gap-[16px] py-[20px] border-b-[1px] border-[#bababa]"
              >
                <div>{orderedProduct.product.name}</div>
                <div className="flex gap-[12px]">
                  <div className="flex items-center">
                    ×{orderedProduct.quantity}
                  </div>
                  <div className="flex items-center">
                    ¥{orderedProduct.product.price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="h-[72px] px-[30px] flex justify-between items-center bg-[#7a4e2f] rounded-[12px] text-[20px] font-bold text-[#ffffff] cursor-pointer"
          onClick={buy}
        >
          <div>¥{totalPrice}</div>
          <div>お会計へ</div>
        </button>
      </div>
    </div>
  );
}

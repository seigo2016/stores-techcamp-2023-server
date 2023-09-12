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
    <div className="w-screen h-screen grid grid-rows-[1fr] grid-cols-[3fr_2fr] p-[20px]">
      <div>
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
      <div className="grid grid-rows-[1fr_100px] grid-cols-[1fr]">
        <div>
          {order.orderedProducts.map((orderedProduct, i) => {
            return (
              <div key={i}>
                <div>{orderedProduct.product.name}</div>
                <div>{orderedProduct.product.price}円</div>
                <div>{orderedProduct.quantity}個</div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div>合計金額</div>
            <div>{totalPrice}円</div>
          </div>
          <button onClick={buy}>購入する</button>
        </div>
      </div>
    </div>
  );
}

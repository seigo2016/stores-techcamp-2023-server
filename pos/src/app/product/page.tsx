"use client";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/models";
import { useOrderState, useTotalPriceState } from "@/globalStates";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const products: Product[] = [
  {
    id: 1,
    name: "キリッとBLACK ブラックコーヒー（無糖）235ml",
    price: 248,
    url: "https://sarutahiko.jp/cdn/shop/products/641d07a182919f421274c08f555cbb0e.jpg?v=1677639512",
  },
  {
    id: 2,
    name: "職人のカフェラテ（甘くない）235ml",
    price: 270,
    url: "https://sarutahiko.jp/cdn/shop/products/ee80406ce792f4332098e3c960873e24.jpg?v=1677639185",
  },
];

export default function PageProduct() {
  const router = useRouter();

  const { order, initOrder, addOrderedProduct } = useOrderState();
  const totalPrice = useTotalPriceState();

  useEffect(() => {
    initOrder();
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

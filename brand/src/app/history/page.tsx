"use client";

import { useUserIDContext } from "@/contexts";
import { Order } from "@/models";
import { getOrders } from "@/usecases";
import { useEffect, useState } from "react";

export default function PageHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { userID } = useUserIDContext();

  useEffect(() => {
    getOrders(userID).then((orders) => setOrders(orders));
  });

  return (
    <div className="w-full h-full p-[12px] flex flex-col items-center gap-[20px] font-normal overflow-y-scroll">
      {orders.map((order) => {
        return (
          <div
            key={order.id}
            className="border-[1px] border-[#8E8E8E]  shadow-[0_1px_4px_0_rgba(0,0,0,1)] rounded-[8px] p-[16px] flex flex-col gap-[12px]"
          >
            <div className="text-[12px] italic">2023/09/14/ 16:00:00</div>
            <div className="flex flex-col gap-[12px]">
              {order.orderedProducts.map((orderedProduct) => {
                return (
                  <div
                    key={orderedProduct.product.id}
                    className="flex gap-[12px]"
                  >
                    <div className="flex-auto">
                      {orderedProduct.product.name}
                    </div>
                    <div className="flex-none flex items-center gap-[8px]">
                      <div>¥{orderedProduct.product.price}</div>
                      <div>×{orderedProduct.quantity}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-right">
              合計金額{" ¥"}
              {order.orderedProducts.reduce(
                (totalPrice, orderedProduct) =>
                  totalPrice +
                  orderedProduct.product.price * orderedProduct.quantity,
                0
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

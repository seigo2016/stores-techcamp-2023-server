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
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-[20px]">
      {orders.map((order) => {
        return (
          <div key={order.id}>
            <div>注文{order.id}</div>
            <div>
              {order.orderedProducts.map((orderedProduct) => {
                return (
                  <div
                    key={orderedProduct.product.id}
                    className="flex justify-between"
                  >
                    <div>{orderedProduct.product.name}</div>
                    <div className="flex gap-[8px]">
                      <div>{orderedProduct.product.price}円</div>
                      <div>{orderedProduct.quantity}個</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

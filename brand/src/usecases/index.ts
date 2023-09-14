import { useUserIDContext } from "@/contexts";
import { Order } from "@/models";

const orders: Order[] = [
  {
    id: "1",
    orderedProducts: [
      {
        product: {
          id: 1,
          name: "キリッとBLACK ブラックコーヒー（無糖）235ml",
          price: 248,
          url: "https://sarutahiko.jp/cdn/shop/products/641d07a182919f421274c08f555cbb0e.jpg?v=1677639512",
        },
        quantity: 1,
      },
    ],
    createdAt: new Date(),
  },
  {
    id: "2",
    orderedProducts: [
      {
        product: {
          id: 1,
          name: "キリッとBLACK ブラックコーヒー（無糖）235ml",
          price: 248,
          url: "https://sarutahiko.jp/cdn/shop/products/641d07a182919f421274c08f555cbb0e.jpg?v=1677639512",
        },
        quantity: 2,
      },
      {
        product: {
          id: 2,
          name: "職人のカフェラテ（甘くない）235ml",
          price: 270,
          url: "https://sarutahiko.jp/cdn/shop/products/ee80406ce792f4332098e3c960873e24.jpg?v=1677639185",
        },
        quantity: 3,
      },
    ],
    createdAt: new Date(),
  },
];

export const getOrders = (userID: string): Promise<Order[]> => {
  return new Promise((resolve) => resolve(orders));
};

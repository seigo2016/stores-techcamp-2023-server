import { Order, Product } from "@/models";

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

export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => resolve(products));
};

export const createOrder = (order: Order): Promise<void> => {
  return new Promise((resolve) => resolve());
};

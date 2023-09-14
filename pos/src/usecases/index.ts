import { Order, Product } from "@/models";
import { DefaultApiFactory, Configuration } from "@/generated";
import axios from "axios";

const configuration = new Configuration();
const basePath = "https://40nb8mhm-10081.asse.devtunnels.ms";
const axiosInstance = axios.create({
  withCredentials: false,
});

const apiClient = DefaultApiFactory(configuration, basePath, axiosInstance);

// const products: Product[] = [
//   {
//     id: "1",
//     name: "キリッとBLACK ブラックコーヒー（無糖）235ml",
//     price: 248,
//     url: "https://sarutahiko.jp/cdn/shop/products/641d07a182919f421274c08f555cbb0e.jpg?v=1677639512",
//   },
//   {
//     id: "2",
//     name: "職人のカフェラテ（甘くない）235ml",
//     price: 270,
//     url: "https://sarutahiko.jp/cdn/shop/products/ee80406ce792f4332098e3c960873e24.jpg?v=1677639185",
//   },
//   {
//     id: "3",
//     name: "無糖/リキッドアイスコーヒー(瓶) 600ml",
//     price: 972,
//     url: "https://sarutahiko.jp/cdn/shop/files/ada02dffe8beee60fdb185acef5cf00f.jpg?v=1694488768&width=1206",
//   },
//   {
//     id: "4",
//     name: "無糖/リキッドアイスコーヒー（大吉ブレンド）",
//     price: 980,
//     url: "https://sarutahiko.jp/cdn/shop/files/72cfd54c8b5c9252e1465ea5fbc33b47.jpg?v=1682392413&width=1206",
//   },
//   {
//     id: "5",
//     name: "オキーニョ",
//     price: 825,
//     url: "https://sarutahiko.jp/cdn/shop/products/4257d69fd793772bb43abed4514a2a17.jpg?v=1677575294&width=1206",
//   },
//   {
//     id: "6",
//     name: "バゲット",
//     price: 308,
//     url: "https://sarutahiko.jp/cdn/shop/products/b2cd87424f8277e58f12a77ec166ba4a.jpg?v=1677575483&width=1206",
//   },
//   {
//     id: "7",
//     name: "コールドブリュー珈琲ゼリー",
//     price: 388,
//     url: "https://sarutahiko.jp/cdn/shop/files/bdab1acaa21dadc45ef5aae445dbe662.jpg?v=1686909393&width=1206",
//   },
//   {
//     id: "8",
//     name: "アーモンドフロランタン",
//     price: 578,
//     url: "https://sarutahiko.jp/cdn/shop/products/6b837e5fd7869813909c2b4c8c3cd02f.jpg?v=1677462786&width=1206",
//   },
// ];

const guardUndef = <T extends {}>(obj: T): obj is Required<T> => {
  return Object.values(obj).every((v) => v !== undefined);
};

export const getProducts = async (): Promise<Product[]> => {
  const products = await apiClient.getItems().then((res) =>
    res.data.map<Product>((item) => {
      if (!guardUndef(item)) throw new Error("api error");
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        url: item.preview,
      };
    })
  );
  return products;
};

export const createOrder = async (order: Order): Promise<void> => {
  await apiClient.postOrders({
    requestOrder: {
      userId: order.userID,
      items: order.orderedProducts.map((orderedProduct) => ({
        id: orderedProduct.product.id,
        quantity: orderedProduct.quantity,
      })),
    },
  });
  return;
};

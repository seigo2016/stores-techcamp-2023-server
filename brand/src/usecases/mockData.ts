import { Order, Product, User } from "@/models";

export const mockOrders: Order[] = [
  {
    id: "1",
    orderedProducts: [
      {
        product: {
          id: "1",
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
          id: "1",
          name: "キリッとBLACK ブラックコーヒー（無糖）235ml",
          price: 248,
          url: "https://sarutahiko.jp/cdn/shop/products/641d07a182919f421274c08f555cbb0e.jpg?v=1677639512",
        },
        quantity: 2,
      },
      {
        product: {
          id: "2",
          name: "職人のカフェラテ（甘くない）235ml",
          price: 270,
          url: "https://sarutahiko.jp/cdn/shop/products/ee80406ce792f4332098e3c960873e24.jpg?v=1677639185",
        },
        quantity: 3,
      },
    ],
    createdAt: new Date(),
  },
  {
    id: "3",
    orderedProducts: [
      {
        product: {
          id: "1",
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
    id: "4",
    orderedProducts: [
      {
        product: {
          id: "1",
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
    id: "5",
    orderedProducts: [
      {
        product: {
          id: "1",
          name: "キリッとBLACK ブラックコーヒー（無糖）235ml",
          price: 248,
          url: "https://sarutahiko.jp/cdn/shop/products/641d07a182919f421274c08f555cbb0e.jpg?v=1677639512",
        },
        quantity: 1,
      },
    ],
    createdAt: new Date(),
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Gopher",
  },
  {
    id: "2",
    name: "Tux",
  },
  {
    id: "3",
    name: "Moby Dock",
  },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "キリッとBLACK ブラックコーヒー（無糖）235ml",
    price: 248,
    url: "https://sarutahiko.jp/cdn/shop/products/641d07a182919f421274c08f555cbb0e.jpg?v=1677639512",
  },
  {
    id: "2",
    name: "職人のカフェラテ（甘くない）235ml",
    price: 270,
    url: "https://sarutahiko.jp/cdn/shop/products/ee80406ce792f4332098e3c960873e24.jpg?v=1677639185",
  },
  {
    id: "3",
    name: "無糖/リキッドアイスコーヒー(瓶) 600ml",
    price: 972,
    url: "https://sarutahiko.jp/cdn/shop/files/ada02dffe8beee60fdb185acef5cf00f.jpg?v=1694488768&width=1206",
  },
  {
    id: "4",
    name: "無糖/リキッドアイスコーヒー（大吉ブレンド）",
    price: 980,
    url: "https://sarutahiko.jp/cdn/shop/files/72cfd54c8b5c9252e1465ea5fbc33b47.jpg?v=1682392413&width=1206",
  },
  {
    id: "5",
    name: "オキーニョ",
    price: 825,
    url: "https://sarutahiko.jp/cdn/shop/products/4257d69fd793772bb43abed4514a2a17.jpg?v=1677575294&width=1206",
  },
  {
    id: "6",
    name: "バゲット",
    price: 308,
    url: "https://sarutahiko.jp/cdn/shop/products/b2cd87424f8277e58f12a77ec166ba4a.jpg?v=1677575483&width=1206",
  },
  {
    id: "7",
    name: "コールドブリュー珈琲ゼリー",
    price: 388,
    url: "https://sarutahiko.jp/cdn/shop/files/bdab1acaa21dadc45ef5aae445dbe662.jpg?v=1686909393&width=1206",
  },
  {
    id: "8",
    name: "アーモンドフロランタン",
    price: 578,
    url: "https://sarutahiko.jp/cdn/shop/products/6b837e5fd7869813909c2b4c8c3cd02f.jpg?v=1677462786&width=1206",
  },
];

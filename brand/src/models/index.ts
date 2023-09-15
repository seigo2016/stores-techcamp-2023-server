export type Product = {
  id: string;
  name: string;
  price: number;
  url: string;
};

export type OrderedProduct = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  orderedProducts: OrderedProduct[];
  createdAt: Date;
};

export type User = {
  id: string;
  name: string;
};

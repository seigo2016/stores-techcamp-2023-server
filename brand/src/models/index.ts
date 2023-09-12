export type Product = {
  id: number;
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
};

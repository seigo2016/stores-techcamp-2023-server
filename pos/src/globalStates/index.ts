import { atom, useRecoilState, selector, useRecoilValue } from "recoil";
import { Order, OrderedProduct, Product } from "@/models";

const orderState = atom<Order>({
  key: "orderState",
  default: { orderedProducts: [] },
});

export const useOrderState = () => {
  const [order, setOrder] = useRecoilState(orderState);

  const initOrder = () => {
    setOrder({ orderedProducts: [] });
  };

  const addOrderedProduct = (product: Product) => {
    const orderedProducts: OrderedProduct[] = order.orderedProducts.map(
      ({ product, quantity }) => ({ product, quantity })
    );

    const idx = orderedProducts.findIndex(
      (orderedProduct) => orderedProduct.product.id === product.id
    );

    if (idx === -1) {
      orderedProducts.push({
        product,
        quantity: 1,
      });
    } else {
      orderedProducts[idx].quantity += 1;
    }

    const newOrder: Order = {
      userID: order.userID,
      orderedProducts: orderedProducts,
    };

    setOrder(newOrder);
  };

  return { order, setOrder, initOrder, addOrderedProduct };
};

const totalPriceState = selector({
  key: "totalPriceState",
  get: ({ get }) => {
    const order = get(orderState);
    const totalPrice = order.orderedProducts.reduce<number>(
      (totalPrice: number, { product, quantity }): number =>
        totalPrice + product.price * quantity,
      0
    );

    return totalPrice;
  },
});

export const useTotalPriceState = () => {
  return useRecoilValue(totalPriceState);
};

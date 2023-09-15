import { Order, Product } from "@/models";
import { DefaultApiFactory, Configuration } from "@/generated";
import axios from "axios";
import { mockProducts } from "./mockData";

const configuration = new Configuration();
const basePath = "https://40nb8mhm-10081.asse.devtunnels.ms";
const axiosInstance = axios.create({
  withCredentials: false,
});

const apiClient = DefaultApiFactory(configuration, basePath, axiosInstance);

const guardUndef = <T extends {}>(obj: T): obj is Required<T> => {
  return Object.values(obj).every((v) => v !== undefined);
};

export const getProducts = async (): Promise<Product[]> => {
  // return apiClient.getItems().then((res) =>
  //   res.data.map<Product>((item) => {
  //     if (!guardUndef(item)) throw new Error("api error");
  //     return {
  //       id: item.id,
  //       name: item.name,
  //       price: item.price,
  //       url: item.preview,
  //     };
  //   })
  // );

  return new Promise((resolve) => resolve(mockProducts));
};

export const createOrder = async (order: Order): Promise<void> => {
  // await apiClient.postOrders({
  //   requestOrder: {
  //     userId: order.userID,
  //     items: order.orderedProducts.map((orderedProduct) => ({
  //       id: orderedProduct.product.id,
  //       quantity: orderedProduct.quantity,
  //     })),
  //   },
  // });
  return new Promise((resolve) => resolve());
};

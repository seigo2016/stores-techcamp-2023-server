import { Order, OrderedProduct, Product, User } from "@/models";

import { DefaultApiFactory, Configuration } from "@/generated";
import axios from "axios";
import { mockOrders, mockProducts, mockUsers } from "./mockdata";

const configuration = new Configuration();
const basePath = "https://40nb8mhm-10081.asse.devtunnels.ms";
const axiosInstance = axios.create({
  withCredentials: false,
});

const apiClient = DefaultApiFactory(configuration, basePath, axiosInstance);

const guardUndef = <T extends {}>(obj: T): obj is Required<T> => {
  return Object.values(obj).every((v) => v !== undefined);
};

export const getOrders = async (userID: string): Promise<Order[]> => {
  // return apiClient.getOrders({ userId: userID }).then((res) => {
  //   if (!guardUndef(res.data)) throw new Error("api error");

  //   const orderedProducts = res.data.items.map<OrderedProduct>((item) => {
  //     if (!guardUndef(item)) throw new Error("api error");
  //     return {
  //       product: {
  //         id: item.id,
  //         name: item.name,
  //         price: item.price,
  //         url: item.preview,
  //       },
  //       quantity: item.quantity,
  //     };
  //   });

  //   return {
  //     id: res.data.OrderId,
  //     orderedProducts: orderedProducts,
  //     createdAt: new Date(res.data.CreatedAt),
  //   };
  // });

  return new Promise((resolve) => resolve(mockOrders));
};

export const getUsers = (): Promise<User[]> => {
  // return apiClient.getAllUsers().then((res) =>
  //   res.data.map<User>((user) => {
  //     if (!guardUndef(user)) throw new Error("api error");
  //     return {
  //       id: user.id,
  //       name: user.name,
  //     };
  //   })
  // );

  return new Promise((resolve) => resolve(mockUsers));
};

export const getRecommendedProducts = (userID: string): Promise<Product[]> => {
  // return apiClient.getUserRecommends({ userId: userID }).then((res) => {
  //   if (!guardUndef(res.data)) throw new Error("api error");
  //   return res.data.items.map<Product>((item) => {
  //     if (!guardUndef(item)) throw new Error("api error");
  //     return {
  //       id: item.id,
  //       name: item.name,
  //       price: item.price,
  //       url: item.preview,
  //     };
  //   });
  // });

  return new Promise((resolve) => resolve(mockProducts));
};

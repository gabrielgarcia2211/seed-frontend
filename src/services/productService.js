import * as productApi from "../api/products";

export const ProductService = {
  getAll: async () => (await productApi.getProducts()).data,
  create: async (data) => (await productApi.createProduct(data)).data,
};
import { api } from "../axios";

export const getProducts = () => api.get("/api/products");
export const createProduct = (data) =>
    api.post("/api/products", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
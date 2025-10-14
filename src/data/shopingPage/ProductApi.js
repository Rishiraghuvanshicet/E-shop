// src/api/productApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchProducts = async (category, material, search) => {
  try {
    const params = {};
    if (category) params.category = category;
    if (material) params.material = material;
    if (search) params.search = search;

    const { data } = await API.get("/products/getProduct", { params });
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const { data } = await API.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};
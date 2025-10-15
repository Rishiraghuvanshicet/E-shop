// src/api/productApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
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

export const createProduct = async (formData) => {
  try {
    const { data } = await API.post("/products/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Friends API
export const addFriendByEmail = async (email) => {
  const { data } = await API.post("/auth/friends/add", { email });
  return data;
};

export const listFriends = async () => {
  const { data } = await API.get("/auth/friends");
  return data;
};

// Messages API
export const getConversation = async (peerId) => {
  const { data } = await API.get(`/messages/${peerId}`);
  return data;
};

// Remove friend
export const removeFriend = async (friendId) => {
  const { data } = await API.delete(`/auth/friends/${friendId}`);
  return data;
};
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/products";

// GET ALL PRODUCTS
export const getAllProducts = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data;
};

// GET PRODUCT BY ID
export const getProductById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/${id}`);
  return res.data;
};

// ADD PRODUCT
export const addProductAPI = async (formData) => {
  const res = await axios.post(API_BASE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// UPDATE PRODUCT
export const updateProductAPI = async (id, formData) => {
  const res = await axios.put(`${API_BASE_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// DELETE PRODUCT
export const deleteProductAPI = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};

import axios from "axios";

const BASE_URL = "https://onegramgoldfancy-main.onrender.com/api/orders";

export const createOrder = async (orderData) => {
  const res = await axios.post(BASE_URL, orderData);
  return res.data;
};

export const getOrders = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

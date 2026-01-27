import axios from "axios";

const BASE_URL = "https://onegramgoldfancy-main.onrender.com/api/banners";

export const fetchBanners = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createBanner = async (formData) => {
  const res = await axios.post(BASE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const toggleBanner = async (id) => {
  const res = await axios.put(`${BASE_URL}/${id}`);
  return res.data;
};

export const deleteBannerApi = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};

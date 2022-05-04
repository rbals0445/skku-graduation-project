import axiosInstance from "./instance";

export const fetchRestaurant = (name) => {
  return axiosInstance.get(`search/getRestaurant/${name}`);
};

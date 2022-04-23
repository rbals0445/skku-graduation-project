import axiosInstance from "./instance";

export const fetchStoreLists = (category) => {
  category = category.toLowerCase();
  return axiosInstance.get(`/menulist/${category}`);
};

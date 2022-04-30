import axiosInstance from "./instance";

export const sendEmailAuthCode = (email) => {
  return axiosInstance.post("/auth", { email });
};

export const checkAuthCode = (email, code) => {
  return axiosInstance.post("/auth/checkAuthCode", { email, code });
};

// 이메일 확인 api

export const checkUserAccount = ({ id, password }) => {
  return axiosInstance.post("/users/login", { id, password });
};

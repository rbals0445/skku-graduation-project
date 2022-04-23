import axiosInstance from "./instance";

export const sendEmailAuthCode = (email) => {
  return axiosInstance.post("/auth", { email: email });
};

// 이메일 확인 api

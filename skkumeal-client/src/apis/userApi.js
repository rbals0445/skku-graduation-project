import axiosInstance from "./instance";

export const fetchMyLikeLists = (id) => {
	return axiosInstance.post("/users/mypage", { id });
};

export const isLikeChecked = (id, name) => {
	return axiosInstance.post("/users/getLike", { id, name });
};

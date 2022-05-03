import axiosInstance from "./instance";

export const likeApi = (id, name) => {
	return axiosInstance.post("/users/like", { id, name });
};

export const dislikeApi = (id, name) => {
	return axiosInstance.post("/users/dislike", { id, name });
};

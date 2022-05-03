import axiosInstance from "./instance";

// param : (getvalueObj, url)
export const fileUploadToDB = (params, url) => {
	let { pn, category, name, location, openhour, closehour } = params;
	openhour = `${openhour} ~ ${closehour}`;
	return axiosInstance.post("/upload/uploadToDB", {
		category,
		name,
		location,
		pn,
		openhour,
		url,
	});
};

// param : (formData)
export const fileUploadToS3 = (files) => {
	let formData = new FormData();
	formData.append("file", files[0]);

	return axiosInstance.post("/upload/uploadToS3", formData, {
		headers: {
			"Content-type": "multipart/form-data",
		},
	});
};

import axiosInstance from "./instance";

// param : (getvalueObj, url)
export const fileUploadToDB = (params, url) => {
  const { pn, category, name, location, openhour } = params;
  const data = JSON.stringify({ pn, category, name, location, openhour, url });
  return axiosInstance.post("/upload/uploadToDB", data);
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

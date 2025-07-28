import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile, imageFile.name);

  try {
    const response = await axiosInstance.post(API_PATHS.image.upload_img, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data; // e.g., { imageUrl: "https://..." }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error(
      error?.response?.data?.message || "Image upload failed. Please try again."
    );
  }
};

export default uploadImage;

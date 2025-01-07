// uploadImage.js
const cloudinary = require("../../config/cloudinary");
const fs = require("fs");
const { ApiError } = require("../error/ApiError");

const uploadImage = async (
  filePath,
  folder = "Product Images",
  height = null,
  width = null,
  crop = "limit"
) => {
  try {
    console.log("Uploading file:", filePath);
    const options = {
      folder: folder,
      height: height,
      width: width,
      crop: crop,
    };
    // console.log("Options are", options);
    const result = await cloudinary.uploader.upload(filePath, options);
    fs.unlinkSync(filePath); 
    console.log("Image uploaded successfully:", result);
    return result;
  } catch (err) {

    fs.unlinkSync(filePath);

    console.error("Error while uploading image:", err);
    throw new ApiError(500, "Error while uploading image", err);
  }
};

module.exports = uploadImage;

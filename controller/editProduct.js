const { ApiError } = require('../util/error/ApiError');
const uploadImage = require('../util/image/uploadImage');
const status = require('http-status');
const Product = require('../models/product');

// const ProductImageHeight = 500;
// const ProductImageWidth = 500;

const editProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productData = JSON.parse(req.body.product);
    console.log('Received product data for update:', productData);

    // Find the existing product
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return next(new ApiError(status.NOT_FOUND, "Product not found"));
    }

    const { 
      name, category, composition, price, package_size, package_size_ml,
      stock_quantity, description, usage, manufacturer_details, 
      batch_info, prescription_required, availability, storage, marketing, details, images, related_products
    } = productData;

    const updatedImages = [];
    if (images && images.length > 0) {
        images.forEach((image) => {
          if (image.url && !image.url.startsWith('blob:') && !image.url.includes('localhost')) {
            updatedImages.push({ url: image.url });
          }
        });
      }

  
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await uploadImage(file.path, "ProductImages");
          if (result && result.secure_url) {
            updatedImages.push({ url: result.secure_url });
          }
        } catch (uploadError) {
          console.error(`Failed to upload image: ${file.originalname}`, uploadError);
        }
      }
    }

    // Handle existing images (keep or remove)
    // if (images && images.length > 0) {
    //   updatedImages = images.filter(image => 
    //     image.url && !image.url.startsWith('blob:') && !image.url.includes('localhost')
    //   );
    // }

    const updatedProductInfo = {
      name,
      category,
      composition,
      price,
      package_size,
      package_size_ml,
      stock_quantity,
      description,
      usage,
      manufacturer_details,
      batch_info,
      prescription_required,
      availability,
      details,
      storage,
      marketing,
      images: updatedImages,
      related_products:related_products
    };

    if (updatedProductInfo.images.length === 0) {
      return next(new ApiError(status.BAD_REQUEST, "At least one product image is required"));
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedProductInfo, { new: true });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error in updating product:", error);
    return next(
      new ApiError(
        status.INTERNAL_SERVER_ERROR,
        "Error in updating product",
        error
      )
    );
  }
};

module.exports = { editProduct };
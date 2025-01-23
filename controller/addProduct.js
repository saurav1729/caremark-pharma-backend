const { ApiError } = require('../util/error/ApiError');
const uploadImage = require('../util/image/uploadImage');
const status = require('http-status');
const Product = require('../models/product')

// const ProductImageHeight = 500;
// const ProductImageWidth = 500;

const addProduct = async (req, res, next) => {
  try {
    const productData = JSON.parse(req.body.product);
    console.log('Received product data:', productData);

    const { 
      name, category, composition, price, package_size, package_size_ml,
      stock_quantity, description, usage, manufacturer_details, 
      batch_info, prescription_required, availability, storage, marketing ,details,images, related_products
    } = productData;
     
    const uploadedImages = [];
    if (images && images.length > 0) {
      images.forEach((image) => {
        if (image.url && !image.url.startsWith('blob:') && !image.url.includes('localhost')) {
          uploadedImages.push({ url: image.url });
        }
      });
    }
 

    const productInfo = {
      name,
      category,
      composition,
      price: price,
      package_size,
      package_size_ml,
      stock_quantity,
      description:description,
      usage:usage,
      manufacturer_details:manufacturer_details,
      batch_info:batch_info,
      prescription_required,
      availability,
      details:details,
      storage,
      marketing:marketing,
      images: [], 
      related_products:related_products
    };

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await uploadImage(file.path, "ProductImages");
          if (result && result.secure_url) {
            uploadedImages.push({ url: result.secure_url });
          }
        } catch (uploadError) {
          console.error(`Failed to upload image: ${file.originalname}`, uploadError);
        }
      }
    }

    productInfo.images = uploadedImages; 

    if (productInfo.images.length === 0) {
      return next(new ApiError(status.BAD_REQUEST, "At least one product image is required"));
    }

    console.log("prduct info", productInfo); 
    // console.log("images", images); 
    // console.log()
    if (productInfo.images.length === 0) {
        return next(new ApiError(status.BAD_REQUEST, "At least one product image is required"));
      }
  
      const newProduct = await Product.create(productInfo);
  
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error in adding product:", error);
    return next(
      new ApiError(
        status.INTERNAL_SERVER_ERROR,
        "Error in adding product",
        error
      )
    );
  }
};

module.exports = { addProduct };


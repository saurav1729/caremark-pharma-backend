const mongoose = require('mongoose');
const Product = require('../models/product');
const { ApiError } = require('../util/error/ApiError');
const deleteImage = require('../util/image/deleteImage');

const deleteProduct = async (req, res, next) => {
  console.log("deleteProduct");
  try {
    const productId = req.params.id;
    console.log('Attempting to delete product with id:', productId);

    // Ensure id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Delete related product images
    if (deletedProduct.images && deletedProduct.images.length > 0) {
      const imageDeletePromises = deletedProduct.images.map(image => 
        deleteImage(image.url, 'ProductImages')
      );

      Promise.all(imageDeletePromises)
        .then((results) => {
          console.log('All product images deleted successfully:', results);
        })
        .catch((error) => {
          console.error('Error in deleting product images:', error);
        });
    }

    // Delete related reviews if requested
    if (req.body.deleteReviews) {
      await Review.deleteMany({ productId: productId });
    }

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });

  } catch (error) {
    console.error('Error in deleting product:', error);
    return res.status(500).json({
      success: false,
      message: 'Error in deleting product',
      error: error.message
    });
  }
};

module.exports = { deleteProduct };


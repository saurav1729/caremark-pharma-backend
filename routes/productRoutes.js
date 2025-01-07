const express = require('express');
const { addProduct } = require('../controller/addProduct');
const { auth, isAdmin } = require('../middlewares/authMiddlewares');
const upload = require('../middlewares/uploadMiddleware');
const {editProduct}=require('../controller/editProduct')
const { getAllProducts, getProductById } = require('../controller/fetchProduts');
const { deleteProduct } = require('../controller/deleteProduct');

const router = express.Router();

router.post('/addProduct', auth, isAdmin, upload.array('images'), addProduct);
router.put('/updateProduct/:id', auth , isAdmin,upload.array('images'),editProduct ); 
router.delete('/deleteProduct/:id',auth,isAdmin, deleteProduct);

router.get('/getAllProducts', getAllProducts); 
router.get('/getProduct/:id', getProductById); 

module.exports = router;


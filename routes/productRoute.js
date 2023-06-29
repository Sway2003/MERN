
const express = require('express');
const Product = require('../models/model');
const {getProducts , getProductById , deleteProduct, updateProduct, createProduct} = require('../controller/productController');
const router = express.Router();



router.get('/', getProducts );

router.get('/:id',getProductById );

router.delete('/:id',deleteProduct );

router.put('/:id', updateProduct );

router.post('/', createProduct)


module.exports = router;

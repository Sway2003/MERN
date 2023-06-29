const Product = require('../models/model');
const asyncHandler = require('express-async-handler');
const getProducts = asyncHandler(async(req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({products});
  }
  catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
})

const getProductById = asyncHandler( async(req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({product});
  }
  catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
})

const deleteProduct = asyncHandler(async(req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });

  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
})

const updateProduct = asyncHandler(async(req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!product){
      //cant find any product with the given id
      return res.status(404).json({message: "Product not found"});
    }
    const updatedProduct = await Product.findById(req.params.id);
    return res.status(200).json({updatedProduct});
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
})

const createProduct = asyncHandler(async(req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({product});
    
  } catch (error) {
     console.log(error.message);
     res.status(500);
      throw new Error(error.message);

    
  }
  })

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct
} 
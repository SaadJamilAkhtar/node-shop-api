const asyncHandler = require('express-async-handler')

// @desc    Get Products
// @route   GET /products
// @access  Public
const getProducts = asyncHandler( async(req, res) => {

})

// @desc    Add Products
// @route   POST /products
// @access  Private
const addProduct = asyncHandler( async(req, res) => {

})


// @desc    Get Particular Product
// @route   GET /products/id
// @access  Public
const getProductById = asyncHandler( async(req, res) => {

})

// @desc    Update Particular Product
// @route   PATCH /products/id
// @access  Private
const updateProduct = asyncHandler( async(req, res) => {

})

// @desc    Delete Particular Product
// @route   DELETE /products/id
// @access  Private
const deleteProduct = asyncHandler( async(req, res) => {

})

module.exports = {getProducts, getProductById, addProduct, deleteProduct, updateProduct}
const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel');
// @desc    Get Products
// @route   GET /products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        products
    });
})

// @desc    Add Products
// @route   POST /products
// @access  Private
const addProduct = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error('Please add Product name');
    }
    if (!req.body.price) {
        res.status(400);
        throw new Error('Please add Product price');
    }
    const product = await Product.create({name: req.body.name, price: req.body.price});
    res.status(200).json(product);
})


// @desc    Get Particular Product
// @route   GET /products/id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(400);
        throw new Error("Product not found");
    }
    res.status(200);
    res.json(product);
})

// @desc    Update Particular Product
// @route   PATCH /products/id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(400);
        throw new Error("Product not found");
    }

    // check if user exists
    if(!req.user){
        res.status(401);
        throw new Error('User not found')
    }
    // goal belongs to logged in user
    if(goal.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User Not Authorized')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    res.status(200).json(updatedGoal)
})

// @desc    Delete Particular Product
// @route   DELETE /products/id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {

})

module.exports = {getProducts, getProductById, addProduct, deleteProduct, updateProduct}
const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel');
// @desc    Get Products
// @route   GET /products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().select('_id name price');
    // response object
    const response = {
        count : products.length,
        products : products.map(product => {
            return {
                id: product._id,
                name: product.name,
                price: product.price,
                url : req.protocol+"://"+req.headers.host + "/products/" + product._id
            }
        })
    }
    res.status(200).json(response);
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
    res.status(201).json({
        id: product._id,
        name: product.name,
        price: product.price,
        url : req.protocol+"://"+req.headers.host + "/products/" + product._id
    });
})


// @desc    Get Particular Product
// @route   GET /products/id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
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
    // if(!req.user){
    //     res.status(401);
    //     throw new Error('User not found')
    // }
    // goal belongs to logged in user
    // if(goal.user.toString() !== req.user.id){
    //     res.status(401);
    //     throw new Error('User Not Authorized')
    // }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set : {
            name: req.body.name || product.name,
            price: req.body.price || product.price
        }
    }, {
        new: true
    });
    res.status(200).json(updatedProduct)
})

// @desc    Delete Particular Product
// @route   DELETE /products/id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    // check if user exists
    // if(!req.user){
    //     res.status(401);
    //     throw new Error('User not found')
    // }
    // // goal belongs to logged in user
    // if(goal.user.toString() !== req.user.id){
    //     res.status(401);
    //     throw new Error('User Not Authorized')
    // }

    await product.remove();
    res.status(200).json({id: req.params.id});
})

module.exports = {getProducts, getProductById, addProduct, deleteProduct, updateProduct}
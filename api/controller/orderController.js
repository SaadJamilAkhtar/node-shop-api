const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel')
// @desc    Get Orders
// @route   GET /orders
// @access  Public
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().select('_id product quantity');
    // response object
    const response = {
        count: orders.length,
        products: orders.map(order => {
            return {
                id: order._id,
                product: order.product,
                quantity: order.quantity,
                url: req.protocol + "://" + req.headers.host + "/orders/" + order._id
            }
        })
    }
    res.status(200).json(response);
})

// @desc    Add Orders
// @route   POST /orders
// @access  Private
const addOrder = asyncHandler(async (req, res) => {
    if (!req.body.product) {
        res.status(400);
        throw new Error('Please add a product');
    }
    const product = await Product.findById(req.body.product);
    if (!product) {
        res.status(404);
        throw new Error('Product not found!');
    }
    const order = await Order.create({
        product: req.body.product,
        quantity: req.body.quantity || 1
    })
    if (!order) {
        res.status(500);
        throw new Error('Could not create order, Try again!')
    }
    res.status(201).json({
        id: order._id,
        product: order.product,
        productUrl: req.protocol + "://" + req.headers.host + "/products/" + product._id,
        quantity: order.quantity

    });

})


// @desc    Get Particular Orders
// @route   GET /orders/id
// @access  Public
const getOrderById = asyncHandler(async (req, res) => {
    if(!req.params.id){
        res.status(400);
        throw new Error("No Id was provided");
    }
    const order = await Order.findById(req.params.id);
    if(!order){
        res.status(404);
        throw new Error('Order not found');
    }
    const product = await Product.findById(order.product);
    res.status(201).json({
        id: order._id,
        product: order.product,
        productUrl: req.protocol + "://" + req.headers.host + "/products/" + product._id,
        quantity: order.quantity

    });
})


// @desc    Delete Particular Order
// @route   DELETE /orders/id
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
    if(!req.params.id){
        res.status(400);
        throw new Error("No Id was provided");
    }
    const order = await Order.findById(req.params.id);
    if(!order){
        res.status(404);
        throw new Error('Order not found');
    }
    await order.delete();
    res.status(200).json({id:req.params.id});
})

module.exports = {getOrders, getOrderById, addOrder, deleteOrder}
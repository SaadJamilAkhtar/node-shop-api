const asyncHandler = require('express-async-handler')

// @desc    Get Orders
// @route   GET /orders
// @access  Public
const getOrders = asyncHandler( async(req, res) => {

})

// @desc    Add Orders
// @route   POST /orders
// @access  Private
const addOrder = asyncHandler( async(req, res) => {

})


// @desc    Get Particular Orders
// @route   GET /orders/id
// @access  Public
const getOrderById = asyncHandler( async(req, res) => {

})


// @desc    Delete Particular Order
// @route   DELETE /orders/id
// @access  Private
const deleteOrder = asyncHandler( async(req, res) => {

})

module.exports = {getOrders, getOrderById, addOrder, deleteOrder}
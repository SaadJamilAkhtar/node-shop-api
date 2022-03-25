const mongoose = require('mongoose')

const Order = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "Please add a product"],
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    }

}, {timestamps:true});

module.exports = mongoose.model('Order', Order)
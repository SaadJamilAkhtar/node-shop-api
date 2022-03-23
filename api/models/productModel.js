const mongoose = require('mongoose')

const Product = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Add A Name To Product."]
    },
    price: {
        type: Number,
        default: 0
    }

}, {timestamps:true});

module.exports = mongoose.model('Product', Product)
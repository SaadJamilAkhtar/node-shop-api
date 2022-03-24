const mongoose = require('mongoose');

const User = mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please Enter a name"]
    },
    username: {
        type: String,
        required: [true, "Please Enter a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please Enter an Email"],
        unique: true
    }
}, {timestamps: true});

module.exports = mongoose.model('User', User)
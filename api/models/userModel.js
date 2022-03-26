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
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password : {
        type: String,
        required: [true, 'Please add a password']
    }
}, {timestamps: true});

module.exports = mongoose.model('User', User)
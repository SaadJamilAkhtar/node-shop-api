const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const auth = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        try{
            // get token
            token = req.headers.authorization.split(" ")[1]

            // Verify
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user from token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (e) {
            console.log(e);
            res.status(401);
            throw new Error('Not Authorized')
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Not Authorized, token missing')
    }
})


module.exports = auth
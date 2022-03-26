const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {token} = require("morgan");

// @desc    Add User
// @route   POST /signup
// @access  Public

const signup = asyncHandler(async (req,res) => {
    console.log(req.body)
    if(!req.body.name){
        res.status(400);
        throw new Error('Please add a name');
    }
    if(!req.body.email){
        res.status(400);
        throw new Error('Please add a email');
    }
    if(!req.body.password){
        res.status(400);
        throw new Error('Please add a password');
    }
    if(!req.body.username){
        res.status(400);
        throw new Error('Please add a username');
    }

    let oldUser = await User.findOne({
        email:req.body.email
    });

    if(oldUser){
        res.status(400);
        throw new Error('user with this email already exists.')
    }

    oldUser = await User.findOne({
        username: req.body.username
    })

    if(oldUser){
        res.status(400);
        throw new Error('user with this username already exists.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword

    });

    if(!user){
        res.status(500);
        throw new Error('Could not create user. Try again!')
    }

    res.status(201).json({
        name:user.name,
        email:user.email,
        username:user.username,
        token:generateToken(user._id)
    });

})


// @desc    Login User
// @route   POST /login
// @access  Public

const login = asyncHandler(async (req,res) => {
    const {email, password, username} = req.body;
    if((!email && !username) || !password){
        res.status(400);
        throw new Error("Missing credentials.")
    }
    // check email
    let user = null;
    if(email){
        user = await User.findOne({email});
    }else{
        user = await User.findOne({username});
    }
    // password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200);
        return res.json({
            username: user.username,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }
    res.status(400)
    throw new Error('Invalid credentials');
})

// generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {signup, login}
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
require('dotenv').config()

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {expiresIn: '3d'})
}

//create new user
exports.signupUser = asyncHandler(async(req, res, next) => {
    try{
        const { email, password } = req.body
        console.log(email, password)
        const newUser = await User.signup(email, password)
        const token = createToken(newUser._id)
        res.status(200).json({message: 'user created!', token})
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
    
})

//login user
exports.loginUser = asyncHandler(async(req, res, next) => {
    res.json({message: 'user logged in!'})
})

//log user out
exports.logoutUser = asyncHandler(async(req, res, next) => {
    res.json({message: 'user logged out'})
})
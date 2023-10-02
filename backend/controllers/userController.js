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
        res.status(200).json({message: 'user created!', email, token, _id: newUser._id })
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
    
})

//login user
exports.loginUser = asyncHandler(async(req, res, next) => {

    const { email, password } = req.body
    
    try{
        const user = await User.login(email, password) 
        const token = createToken(user._id)
        res.status(200).json({message: 'user logged in!', email, token, _id: user._id })
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
    
    
})

//log user out
exports.logoutUser = asyncHandler(async(req, res, next) => {
    res.json({message: 'user logged out'})
})

//test log in

exports.test_loginUser = asyncHandler(async(req, res) => {
    res.json({message: 'test login'})
    try{
        const user = await User.login(email, password) 
        const token = createToken(user._id)
        res.status(200).json({message: 'user logged in!', email, token, _id: user._id })
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})
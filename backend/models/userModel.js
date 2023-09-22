const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        unique: false
    }
})

//static signup method

userSchema.statics.signup = async function(email, password) {
    const exists = await this.findOne({ email })

    if(!email || !password){
        throw Error('Must enter email and password')
    }

    if(!validator.isEmail(email)){
        throw Error('Email must be a valid email')
    }

    const passwordStrengthOptions = { minLength: 6, minLowercase: 1, minUppercase: 0, minNumbers: 1, minSymbols: 1, returnScore: false}

    if(!validator.isStrongPassword(password, passwordStrengthOptions)){
        throw Error('Password must be at least 6 characters long and contain at least 1 number and 1 symbol')
    }

    if(exists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newUser = await this.create({ email, password: hash})
    return newUser
}

module.exports = mongoose.model('user', userSchema)


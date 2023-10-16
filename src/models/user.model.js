const {Schema} = require('mongoose')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    firstName: {
        trim: true,
        type: String,
        required: [true, 'first name property is required']
    },
    lastName: {
        trim: true,
        type: String,
        required: [true, 'last name property is required']
    },
    email: {
        trim: true,
        type: String,
        unique: [true, 'email should be unique'],
        required: [true, 'email property is required']
    },
    password: {
        type: String,
        required: [true, 'password field is required']
    }
})

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
module.exports = User
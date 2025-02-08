const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    food: {
            type: String,
            required: true,
        },
    }, {timestamps: true}) 
    
    
    
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    pantry: [foodSchema]
}, {timestamps: true}) 




const User = mongoose.model('User', userSchema)
const Food = mongoose.model('Food', foodSchema)

module.exports = User, Food

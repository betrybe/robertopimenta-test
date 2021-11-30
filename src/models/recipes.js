const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    preparation: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
})

const recipes = mongoose.model('recipes', DataSchema)

module.exports = recipes
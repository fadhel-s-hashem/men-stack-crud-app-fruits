const { name } = require('ejs')
const mongoose =require('mongoose')

const fruitSchema = new mongoose.Schema({
    name: String, 
    isReadyToEat: Boolean
})

const Fruit = mongoose.Mongoose.model("Fruit" ,fruitSchema)

module.exports = Fruit
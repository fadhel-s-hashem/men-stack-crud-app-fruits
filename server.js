const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dns = require('node:dns')
dns.setServers(['8.8.8.8', '1.1.1.1'])

const app = express()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () =>{
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

const Fruit = require('./models/fruit.js')

app.use(morgan('dev'))


app.get('/', async (req, res) => {
    res.render('home.ejs')
})

//this rote will change often
app.get('/fruits', async (req,res)=>{
// crat fruit object
    const fruitData = {}

    fruitData.name = "banana"
    fruitData.isReadyToEat = true
    // use a mango method to add it to the DB
//=======================================================
    // await Fruit.create(fruitData)
    let craetFruit = await Fruit.create(fruitData)

    // view the created fruit
//============================================================
    // res.send(Fruit)
    res.send(craetFruit)
})


app.listen(3000, function(){
    console.log('Listening on port 3000')
})



// code Graveyard===========================================
// crat fruit object
//     const fruitData = {}

//     fruitData.name = "banana"
//     fruitData.isReadyToEat = true
//     // use a mango method to add it to the DB
// //=======================================================
//     // await Fruit.create(fruitData)
//     let craetFruit = await Fruit.create(fruitData)
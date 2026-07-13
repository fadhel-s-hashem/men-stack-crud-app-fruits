const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dns = require('node:dns')
const path = require('path')
const methodOverride = require('method-override')
dns.setServers(['8.8.8.8', '1.1.1.1'])

const app = express()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () =>{
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

const Fruit = require('./models/fruit.js')
const { name } = require('ejs')
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'))

app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, "public")))
//=============================================================

app.get('/', async (req, res) => {
    res.render('home.ejs')
})

//(form for crating fruit) (just diplay)
app.get('/fruits/new', async (req,res)=>{
    res.render('new.ejs')
})

// post /fruits (creat fruit in database)
app.post('/fruits', async (req,res) =>{

    // fruitData object should match Fruit model
    const fruitData = {}
    fruitData.name = req.body.name

    if( req.body.isReadyToEat === 'on'){
        fruitData.isReadyToEat = true
    } else {
        fruitData.isReadyToEat = false
    }
    // fruitData.isReadyToEat = req.body.isReadyToEat
    
    let craetFruit = await Fruit.create(fruitData)

    res.redirect('/fruits')
})

// GET all fruit /fruits - index route
app.get('/fruits' , async (req,res)=> {
    const allFruits = await Fruit.find()
    // console.log(allFruits) =this to show in terminal

    res.render('index.ejs' ,{
        allFruits: allFruits
    })
})

//  show route = and delete
app.get('/fruits/:fruitID' , async (req,res)=> {
    let foundFruit = await Fruit.findById(req.params.fruitID)
    
    res.render('Show.ejs' , {
        foundFruit :foundFruit
    })
})

app.delete('/fruits/:fruitID' , async (req,res) => {
    let deleteFruit = await Fruit.findByIdAndDelete(req.params.fruitID)
    res.redirect('/fruits')

})

// GET the edit form 
app.get('/fruits/:fruitID/edit', async (req,res) => {
    let updatedFruit = await Fruit.findById(req.params.fruitID)
    console.log(updatedFruit)
    res.render('edit.ejs' , {
        foundFruit :updatedFruit
    })
})

// pUT- actually update fruit in the databace
app.put('/fruits/:fruitID',async (req,res)=> {
    const fruitedited = {}
    fruitedited.name = req.body.name

    if( req.body.isReadyToEat === 'on'){
        fruitedited.isReadyToEat = true
    } else {
        fruitedited.isReadyToEat = false
    }

    await Fruit.findByIdAndUpdate(req.params.fruitID, fruitedited, {new:true})
res.redirect(`/fruits/${req.params.fruitID}`)
})

app.listen(3000, function(){
    console.log('Listening on port 3000')
})

// Im adding comment 👾 for mvc




// code Graveyard===========================================

// creat fruit object
//     const fruitData = {}

//     fruitData.name = "banana"
//     fruitData.isReadyToEat = true
//     // use a mango method to add it to the DB
// //=======================================================
//     // await Fruit.create(fruitData)
//     let craetFruit = await Fruit.create(fruitData)

//==========================================================
 // use a mango method to find and show all data 
//  let allFruit = await Fruit.find() 

//==========================================================
// use a mango method to find sertan some thing it to the DB

    // let allBanan = await Fruit.find({ name: 'banana'})

    // // view the created fruit
    // res.send(allBanan)

    //======================

    // let notReady = await Fruit.find({ isReadyToEat: 'true'})

    // // view the created fruit
    // res.send(notReady)

//=========================================================
    // use a mango method to find first thing and updated to diffrent value

    // let updatedFruit = await Fruit.findByIdAndUpdate("6a4f6a0fea86c553a91a4600", {name: 'pinapple'}, {isReadyToEat: false} , {new:true})

    // // view the created fruit
    // res.send(updatedFruit)
    //=====================================================
    // to finb something by Id

    // let foundFruit = await Fruit.findById("6a4f6a0fea86c553a91a4600", {name: 'pinapple'}, {isReadyToEat: false} , {new:true})

    // res.send(foundFruit)

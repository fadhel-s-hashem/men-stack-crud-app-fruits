const Fruit = require('../models/fruit.js')

// index
const index = async (req, res) => {
    let allFruits = await Fruit.find()
    // console.log(allFruits) =this to show in terminal

    res.render('index.ejs', {
        allFruits: allFruits
    })
}

//show
const show = async (req, res) => {
    let foundFruit = await Fruit.findById(req.params.fruitID)

    res.render('Show.ejs', {
        foundFruit: foundFruit
    })
}

//creat form
const create = async (req, res) => {

    // fruitData object should match Fruit model
    const fruitData = {}
    fruitData.name = req.body.name

    if (req.body.isReadyToEat === 'on') {
        fruitData.isReadyToEat = true
    } else {
        fruitData.isReadyToEat = false
    }
    // fruitData.isReadyToEat = req.body.isReadyToEat

    let craetFruit = await Fruit.create(fruitData)

    res.redirect('/fruits')
}

// delete fruit
const deleteFruit = async (req, res) => {
    let deleteFruit = await Fruit.findByIdAndDelete(req.params.fruitID)
    res.redirect('/fruits')

}

// edit
const edit = async (req, res) => {
    let updatedFruit = await Fruit.findById(req.params.fruitID)
    console.log(updatedFruit)
    res.render('edit.ejs', {
        foundFruit: updatedFruit
    })
}

//put - update
const update = async (req, res) => {
    const fruitedited = {}
    fruitedited.name = req.body.name

    if (req.body.isReadyToEat === 'on') {
        fruitedited.isReadyToEat = true
    } else {
        fruitedited.isReadyToEat = false
    }

    await Fruit.findByIdAndUpdate(req.params.fruitID, fruitedited, { new: true })
    res.redirect(`/fruits/${req.params.fruitID}`)
}

//show new form
const showNewForm = async (req, res) => {
    res.render('new.ejs')
}
module.exports = {
    index, show, create, deleteFruit, edit, update, showNewForm,
}
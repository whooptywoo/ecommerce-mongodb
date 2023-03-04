const fs = require ('fs')
const User = require("../models/User");
const Product = require("../models/Product")
const {hashPassword} = require('../helpers/bcrypt')
const productData = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
const userData = JSON.parse(fs.readFileSync('./users.json', 'utf-8')).map(el => {
    el.password = hashPassword(el.password)
    return el
})

async function runSeed() {
    await User.deleteMany({})
    await Product.deleteMany({})
    const users = await User.insertMany(userData)
    const products = await Product.insertMany(productData)
    // await Product.findByIdAndUpdate("64030c268637a388f5590d04", {$push: {buyers: "64030c268637a388f5590cfe"}})
    // const product = await Product.findById("64030c268637a388f5590d04").populate('buyers')
    console.log(users, products)
    // console.log(product)
}

module.exports = runSeed







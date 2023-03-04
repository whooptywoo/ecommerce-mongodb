const fs = require ('fs')
const User = require("../models/User");
const Product = require("../models/Product")
const userData = JSON.parse(fs.readFileSync('./users.json', 'utf-8'))
const productData = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))

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



// async function seedUser() {
//     const uri = "mongodb+srv://whooptywoo:x3QHQwSMvaHTQ15F@cluster0.qzsydtt.mongodb.net/?retryWrites=true&w=majority"
//     const client = new MongoClient(uri, {
//         useNewUrlParser: true,
//     })
//     try {
//         await client.connect();
//         console.log("Success connect");
//         const userCollection = client.db("egroceries").collection("users");
//         const productCollection = client.db("egroceries").collection("products");
//         userCollection.drop();
//         productCollection.drop();
//         userCollection.insertMany(users);
//         productCollection.insertMany(products);
//         console.log("Database seeded")
//         // client.close();
//     } catch (err) {
//         console.log(err.stack)
//     }
// }

// seedUser()




const express = require('express');
const router = express.Router();
const Controller = require('../controllers')
const authentication = require('../middlewares/authentication')

router.post('/register', Controller.registerUser)
router.post('/login', Controller.login)
router.get('/users', Controller.fetchUsers)
router.get('/products', Controller.fetchProducts)
router.use(authentication)
router.post('/products', Controller.addProduct)
router.delete('/products/:id', Controller.deleteProduct)
router.patch('/products/:id', Controller.addToCart)
router.put('/products/:id', Controller.editProductInfo)
router.get('/cart', Controller.fetchCart);

module.exports = router;
const express = require('express');
const router = express.Router();
const Controller = require('../controllers')
const authentication = require('../middlewares/authentication')

router.post('/register', Controller.registerUser)
router.post('/login', Controller.login)
router.use(authentication)
router.get('/products', Controller.fetchProducts)
router.post('/products', Controller.addProduct)

module.exports = router;
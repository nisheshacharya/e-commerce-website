const productController = require('../controllers/productController')
const express = require('express');
const router = express.Router();


router.post('/add', productController.addProduct);

module.exports = router;
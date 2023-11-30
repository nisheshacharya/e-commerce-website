const productController = require('../controllers/productController')
const express = require('express');
const router = express.Router();


router.post('/add', productController.addProduct);
router.get('/:id', productController.getProductById);
router.get('/results/:name', productController.getProductByName); 
router.get('/', productController.getAllProducts); 

module.exports = router;
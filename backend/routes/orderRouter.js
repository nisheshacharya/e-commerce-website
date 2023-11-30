const  orderController = require('../controllers/orderController');
const express = require('express');
const router = express.Router();

router.post('/order', orderController.addToOrder);
router.get('/order', orderController.getAllOrders)

module.exports= router;

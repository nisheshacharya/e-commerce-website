const orderController = require("../controllers/orderController");
const express = require("express");
const router = express.Router();

router.post("/", orderController.addToOrder);
router.get("/", orderController.getAllOrders);

module.exports = router;

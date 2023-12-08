const productController = require("../controllers/productController");
const express = require("express");
const router = express.Router();

router.post("/add", productController.addProduct);
router.patch("/add-review/:id", productController.addReviewToProduct);
router.get("/:id", productController.getProductById);
router.get("/results/:name", productController.getProductByName);
router.get("/", productController.getAllProducts);
router.put("/:id", productController.updateProduct);

module.exports = router;

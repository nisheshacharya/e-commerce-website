const Product = require("../models/productModel");

exports.addProduct = async (req, res) => {
  console.log(req);

  const {
    name,
    description,
    price,
    quantity,
    images,
    category,
    averageRating,
    reviews,
  } = req.body;
  let product = new Product(
    name,
    description,
    price,
    quantity,
    images,
    category,
    averageRating,
    reviews
  );
  try {
    await product.saveProduct(product);
    res.status(200).json({ success: true, message: "registered" });
    console.log("Product added");
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: "false", message: "server error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    console.log("products from get all:-----", products);
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "server error" });
  }
};

exports.getProductByName = async (req, res) => {
  const { name } = req.params;
  console.log("name: ", name);
  try {
    const products = await Product.findByProductName(name);
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.findByProductId(id);
    if (!products || products.length === 0) {
      return res.status(404).send({ message: "No product found" });
    }
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

exports.addReviewToProduct = async (req, res) => {
  const { id } = req.params;
  const { userId, text, rating } = req.body;

  try {
    const products = await Product.findByProductId(id);
    if (!products || products.length === 0) {
      return res.status(404).send({ message: "No product found" });
    }
    const updatedProduct = await Product.addReviewToProduct(
      id,
      userId,
      text,
      rating
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "Unable to complete update" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

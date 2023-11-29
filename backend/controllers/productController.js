const Product = require('../models/productModel');

exports.addProduct = async(req, res)=> {
    console.log("add product hit +++++++++++++++++++");
    console.log(req);

    const {product_id, name, description, price, quantity, images, category, averageRating, reviews} = req.body;
    let product = new Product(product_id, name, description, price, quantity, images, category, averageRating, reviews);
    try{
        await product.saveProduct(product);
        res.status(200).json({success: true, message: "registered"})
        console.log("Product added")
    }
    catch (err){
        console.error(err);
        res.status(500).json({success: "false", message: "server error"})

    }
}
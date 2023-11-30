  const { getDb } = require('../utils/database');
  const { ObjectId } = require('mongodb');

  class Product {
      constructor(product_id, name, description, price, quantity, images = [], category, averageRating, reviews = []) {
          this.productId = product_id;
          this.name = name;
          this.description = description;
          this.price = price;
          this.quantity = quantity;
          this.images = images;
          this.category = category;
          this.averageRating = averageRating;
          this.reviews = reviews;
          this.deleted = false;
      }

      async saveProduct() {
          const db = getDb();

          try {
              const existingProduct = await db.collection('products').findOne({ productId: this.productId });
              if (existingProduct) {
                  throw new Error("Product already exists");
              } else {
                  await db.collection('products').insertOne(this);
              }
          } catch (error) {
              console.error("Error occurred");
              throw error;
          }
      }

      static async findByProductId(productId) {
          const db = getDb();
          return db.collection('products').findOne({ productId: productId });
      }

      static async findByProductName(productName) {
        // console.log("product Name-------", productName);
        const db = getDb();
        return db.collection('products').find({ name: productName}).toArray();
    }

      static async getAllProducts (){
        const db = getDb();
        return db.collection('products').find({}).toArray();
      }
  }

  module.exports = Product;



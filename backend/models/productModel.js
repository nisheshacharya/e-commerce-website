const { getDb } = require("../utils/database");
const { ObjectId } = require("mongodb");

class Product {
  constructor(
    name,
    description,
    price,
    quantity,
    images = [],
    category,
    averageRating,
    reviews = []
  ) {
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
      const existingProduct = await db
        .collection("products")
        .findOne({ name: this.name });
      if (existingProduct) {
        throw new Error("Product already exists");
      } else {
        await db.collection("products").insertOne(this);
      }
    } catch (error) {
      console.error("Error occurred");
      throw error;
    }
  }

  static async findByProductId(productId) {
    const db = getDb();
    return db.collection("products").findOne({ _id: new ObjectId(productId) });
  }

  static async findByProductName(productName) {
    const db = getDb();
    return db.collection("products").find({ name: productName }).toArray();
  }

  static async getAllProducts() {
    const db = getDb();
    return db.collection("products").find({}).toArray();
  }

  static async addReviewToProduct(productId, userId, text, rating) {
    const db = getDb();

    try {
      const updatedProduct = await db.collection("products").findOneAndUpdate(
        { _id: new ObjectId(productId) },
        {
          $push: {
            reviews: {
              userId: new ObjectId(userId),
              text,
              rating,
            },
          },
        },
        { returnDocument: "after" }
      );

      return updatedProduct.value;
    } catch (error) {
      console.error(
        "Error occurred while adding a review to the product",
        error
      );
      throw error;
    }
  }
}

module.exports = Product;

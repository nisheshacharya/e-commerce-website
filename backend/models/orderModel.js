const { getDb } = require("../utils/database");
const { ObjectId } = require("mongodb");

class Order {
  constructor(userId, items = [], totalAmount, orderDateTime, payment) {
    this.userId = userId;
    this.items = items;
    this.orderDateTime = orderDateTime;
    this.totalAmount = totalAmount;
    this.payment = payment;
    this.status = "ordered";
  }

  async saveOrder() {
    const db = getDb();
    try {
      db.collection("orders").insertOne(this);
    } catch (err) {
      console.error("Error occurred");
      throw err;
    }
  }

  static async getAllOrders() {
    const db = getDb();
    return db.collection("orders").find({}).toArray();
  }

  static async deleteOrder(order_Id) {
    const db = getDb();
    try {
      const result = await db
        .collection("orders")
        .deleteOne({ orderId: order_Id });
      if (result.deletedCount === 0) {
        throw new Error("Order not found");
      }
      console.log(`Order with orderId ${order_Id} deleted successfully`);
    } catch (err) {
      console.error("Error occurred while deleting order:", err);
      throw err;
    }
  }

  static async getOrderByUser(userId) {
    const db = getDb();
    console.log(userId);
    const result = await db
      .collection("orders")
      .find({ userId: userId })
      .toArray();
    return result;
  }
}

module.exports = Order;

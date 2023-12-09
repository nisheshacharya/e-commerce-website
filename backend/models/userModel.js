const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/database");

class User {
  constructor(email, userName, password) {
    this.email = email;
    this.userName = userName;
    this.password = password;
    this.role = "customer";
    this.deleted = false;
  }

  async save() {
    const db = getDb();

    const existingUser = await db.collection("users").findOne({ email: this.email });

    if (existingUser) {
      throw new Error(
        "Email already exists. Please use a different email address."
      );
    } else {
      return db.collection("users").insertOne(this);
    }
  }

  static async findByEmail(email) {
    const db = getDb();
    return await db.collection("users").findOne({ email });
  }

  static async findById(userId) {
    const db = getDb();
    return await db.collection("users").findOne({ _id: new ObjectId(userId) });
  }

  
  async updateProfile(userId, newUserName, newEmail) {
    const db = getDb();

    try {
      const updatedUser = await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            userName: newUserName,
            email: newEmail,
          },
        },
        { returnDocument: "after" }
      );

      return updatedUser.value;
    } catch (error) {
      console.error("Error occurred while updating user profile", error);
      throw error;
    }
  }
}

module.exports = User;

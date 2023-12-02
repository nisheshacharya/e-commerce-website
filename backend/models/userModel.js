const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/database');

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

    
    const existingUser = await db.collection('users').findOne({ email: this.email });

    if (existingUser) {
      throw new Error('Email already exists. Please use a different email address.');
    } else {

      return db.collection('users').insertOne(this);
    }
  }

  static async findByEmail(email) {
    const db = getDb();
    return await db.collection('users').findOne({ email });
  }
  
  static async findById(userId) {
    const db = getDb();
    return await db.collection('users').findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;

const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
let db;

const client = new MongoClient(uri);



async function connectToDB() {
    try {
        await client.connect();
        db = client.db('project');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

function getDb() {
    if (db) {
        return db;
    } else {
        throw new Error('No Database Found');
    }
}

module.exports = { connectToDB, getDb };

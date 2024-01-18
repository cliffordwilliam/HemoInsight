require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_NAME;
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log("Successfully connect");
    return client;
  } catch (error) {
    await client.close();
    throw error;
  }
}
// getter
function getDatabase() {
  return client.db(dbName);
}

module.exports = {
  connect,
  getDatabase,
};

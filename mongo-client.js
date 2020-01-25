const mongodbClient = require("mongodb").MongoClient;
const connectionString = "mongodb://localhost:27017/testDb"
let client;

async function getDb() {
  if (!client || !client.isConnected()) {
    client = await mongodbClient.connect(connectionString, {"useNewUrlParser": true, "useUnifiedTopology": true});
    console.log("connected successfully!!");
  }
  return client.db();
}

async function getCollection(collectionName) {
  const db = await getDb();
  return db.collection(collectionName);
}

module.exports = {
  getCollection
};

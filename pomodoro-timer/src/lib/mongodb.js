require('dotenv').config(); // Cargar variables de entorno desde .env
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://gabrielanava:${process.env.DB_PASSWORD}@pomobreaktime.mvbx8.mongodb.net/?retryWrites=true&w=majority&appName=PomoBreakTime`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

module.exports = clientPromise;

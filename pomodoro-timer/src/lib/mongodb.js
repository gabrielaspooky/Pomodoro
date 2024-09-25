require('dotenv').config(); // Cargar variables de entorno desde .env
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@pomobreaktime.mvbx8.mongodb.net/?retryWrites=true&w=majority&appName=PomoBreakTime`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Conexión exitosa a MongoDB!");
    return client.db(); // Retorna la instancia de la base de datos
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
}

module.exports = { connectToDatabase, client };

import { MongoClient } from 'mongodb';
import './env';

const databaseName = process.env.MONGODB_DB || 'naviurban';

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
  mongoClientPromise?: Promise<MongoClient>;
};
function getMongoUri() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('Missing MONGODB_URI. Define it in .env or .env.local.');
  }

  return mongoUri;
}

function getMongoClientPromise() {
  if (!globalForMongo.mongoClientPromise) {
    const client = globalForMongo.mongoClient ?? new MongoClient(getMongoUri());
    globalForMongo.mongoClient = client;
    globalForMongo.mongoClientPromise = client.connect();
  }

  return globalForMongo.mongoClientPromise;
}

export async function getDatabase() {
  const connectedClient = await getMongoClientPromise();
  return connectedClient.db(databaseName);
}

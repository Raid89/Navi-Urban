import { MongoClient } from 'mongodb';
import './env';

const mongoUri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || 'naviurban';

if (!mongoUri) {
  throw new Error('Missing MONGODB_URI. Define it in .env or .env.local.');
}

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
  mongoClientPromise?: Promise<MongoClient>;
};

const client = globalForMongo.mongoClient ?? new MongoClient(mongoUri);

if (!globalForMongo.mongoClientPromise) {
  globalForMongo.mongoClient = client;
  globalForMongo.mongoClientPromise = client.connect();
}

export const mongoClientPromise = globalForMongo.mongoClientPromise;

export async function getDatabase() {
  const connectedClient = await mongoClientPromise;
  return connectedClient.db(databaseName);
}

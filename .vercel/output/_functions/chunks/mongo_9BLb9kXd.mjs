import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import nodePath from 'node:path';
import { fileURLToPath } from 'node:url';

const globalForEnv = globalThis;
if (!globalForEnv.envLoaded) {
  const projectRoot = nodePath.resolve(nodePath.dirname(fileURLToPath(import.meta.url)), "..", "..");
  dotenv.config({ path: nodePath.join(projectRoot, ".env") });
  dotenv.config({ path: nodePath.join(projectRoot, ".env.local"), override: false });
  globalForEnv.envLoaded = true;
}

const mongoUri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || "naviurban";
if (!mongoUri) {
  throw new Error("Missing MONGODB_URI. Define it in .env or .env.local.");
}
const globalForMongo = globalThis;
const client = globalForMongo.mongoClient ?? new MongoClient(mongoUri);
if (!globalForMongo.mongoClientPromise) {
  globalForMongo.mongoClient = client;
  globalForMongo.mongoClientPromise = client.connect();
}
const mongoClientPromise = globalForMongo.mongoClientPromise;
async function getDatabase() {
  const connectedClient = await mongoClientPromise;
  return connectedClient.db(databaseName);
}

export { getDatabase as g };

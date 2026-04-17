import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import nodePath from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const globalForEnv = globalThis;
if (!globalForEnv.envLoaded) {
  try {
    const projectRoot = nodePath.resolve(nodePath.dirname(fileURLToPath(import.meta.url)), "..", "..");
    const envPath = nodePath.join(projectRoot, ".env");
    const envLocalPath = nodePath.join(projectRoot, ".env.local");
    if (existsSync(envPath)) {
      dotenv.config({ path: envPath });
    }
    if (existsSync(envLocalPath)) {
      dotenv.config({ path: envLocalPath, override: false });
    }
  } catch (error) {
    console.debug("Note: .env files not found or not readable, using environment variables instead");
  }
  globalForEnv.envLoaded = true;
}

const databaseName = process.env.MONGODB_DB || "naviurban";
const globalForMongo = globalThis;
function getMongoUri() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI. Define it in .env or .env.local.");
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
async function getDatabase() {
  const connectedClient = await getMongoClientPromise();
  return connectedClient.db(databaseName);
}

export { getDatabase as g };

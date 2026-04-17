import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const globalForEnv = globalThis as typeof globalThis & { envLoaded?: boolean };

if (!globalForEnv.envLoaded) {
  try {
    const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
    const envPath = path.join(projectRoot, '.env');
    const envLocalPath = path.join(projectRoot, '.env.local');

    // Only load .env files if they exist (they won't in Vercel/production)
    if (existsSync(envPath)) {
      dotenv.config({ path: envPath });
    }
    if (existsSync(envLocalPath)) {
      dotenv.config({ path: envLocalPath, override: false });
    }
  } catch (error) {
    // Silently fail if .env loading fails (e.g., in Vercel/production)
    console.debug('Note: .env files not found or not readable, using environment variables instead');
  }

  globalForEnv.envLoaded = true;
}

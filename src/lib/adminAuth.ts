import crypto from 'node:crypto';
import './env';

const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;
export const ADMIN_COOKIE_NAME = 'navi_admin_session';
const PASSWORD_ITERATIONS = 120000;
const PASSWORD_KEY_LENGTH = 32;
const PASSWORD_DIGEST = 'sha256';

if (!ADMIN_SESSION_SECRET) {
  throw new Error('Missing ADMIN_SESSION_SECRET. Define it in .env or .env.local.');
}

export function hashAdminPassword(password: string, salt = crypto.randomBytes(16).toString('hex')) {
  const derivedKey = crypto.pbkdf2Sync(password, salt, PASSWORD_ITERATIONS, PASSWORD_KEY_LENGTH, PASSWORD_DIGEST);
  return `pbkdf2$${PASSWORD_ITERATIONS}$${salt}$${derivedKey.toString('hex')}`;
}

export function verifyAdminPassword(password: string, storedHash: string) {
  const parts = storedHash.split('$');

  if (parts.length !== 4 || parts[0] !== 'pbkdf2') {
    return false;
  }

  const iterations = Number(parts[1]);
  const salt = parts[2];
  const expectedHash = parts[3];
  const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, expectedHash.length / 2, PASSWORD_DIGEST);

  return crypto.timingSafeEqual(Buffer.from(expectedHash, 'hex'), derivedKey);
}

export function signAdminSession(sessionId: string) {
  const signature = crypto.createHmac('sha256', ADMIN_SESSION_SECRET).update(sessionId).digest('hex');
  return `${sessionId}.${signature}`;
}

export function verifyAdminSession(token: string) {
  const [sessionId, signature] = token.split('.');

  if (!sessionId || !signature) {
    return null;
  }

  const expectedSignature = crypto.createHmac('sha256', ADMIN_SESSION_SECRET).update(sessionId).digest('hex');

  if (signature.length !== expectedSignature.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expectedSignature, 'hex'))) {
    return null;
  }

  return sessionId;
}

export function createAdminSessionToken() {
  const sessionId = crypto.randomUUID();
  return { sessionId, token: signAdminSession(sessionId) };
}

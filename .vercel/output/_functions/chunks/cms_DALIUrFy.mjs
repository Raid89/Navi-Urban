import crypto from 'node:crypto';
import { g as getDatabase } from './mongo_BfYADjV2.mjs';

const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "fallback-secret-change-this-in-production";
const ADMIN_COOKIE_NAME = "navi_admin_session";
const PASSWORD_DIGEST = "sha256";
function verifyAdminPassword(password, storedHash) {
  const parts = storedHash.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") {
    return false;
  }
  const iterations = Number(parts[1]);
  const salt = parts[2];
  const expectedHash = parts[3];
  const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, expectedHash.length / 2, PASSWORD_DIGEST);
  return crypto.timingSafeEqual(Buffer.from(expectedHash, "hex"), derivedKey);
}
function signAdminSession(sessionId) {
  const signature = crypto.createHmac("sha256", ADMIN_SESSION_SECRET).update(sessionId).digest("hex");
  return `${sessionId}.${signature}`;
}
function verifyAdminSession(token) {
  const [sessionId, signature] = token.split(".");
  if (!sessionId || !signature) {
    return null;
  }
  const expectedSignature = crypto.createHmac("sha256", ADMIN_SESSION_SECRET).update(sessionId).digest("hex");
  if (signature.length !== expectedSignature.length) {
    return null;
  }
  if (!crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expectedSignature, "hex"))) {
    return null;
  }
  return sessionId;
}
function createAdminSessionToken() {
  const sessionId = crypto.randomUUID();
  return { sessionId, token: signAdminSession(sessionId) };
}

const productsCollectionName = "products";
const promotionsCollectionName = "promotions";
const adminsCollectionName = "admins";
const adminSessionsCollectionName = "admin_sessions";
function normalizeProductImages(images) {
  return images.map((image) => typeof image === "string" ? { url: image, publicId: "" } : image);
}
async function getProductById(id) {
  const database = await getDatabase();
  const product = await database.collection(productsCollectionName).findOne({ _id: id });
  return product ? product : null;
}
async function getAllProducts() {
  const database = await getDatabase();
  const products = await database.collection(productsCollectionName).find({}).sort({ updatedAt: -1, createdAt: -1 }).toArray();
  return products;
}
async function upsertProduct(product) {
  const database = await getDatabase();
  await database.collection(productsCollectionName).updateOne(
    { _id: product.id },
    {
      $set: {
        _id: product.id,
        ...product,
        images: normalizeProductImages(product.images),
        updatedAt: /* @__PURE__ */ new Date()
      },
      $setOnInsert: {
        createdAt: /* @__PURE__ */ new Date()
      }
    },
    { upsert: true }
  );
}
async function deleteProduct(id) {
  const database = await getDatabase();
  await database.collection(productsCollectionName).deleteOne({ _id: id });
}
async function getPromotions() {
  const database = await getDatabase();
  const promotions = await database.collection(promotionsCollectionName).find({}).sort({ updatedAt: -1, createdAt: -1 }).toArray();
  return promotions.map((promotion) => ({
    ...promotion,
    id: promotion._id
  }));
}
async function getPromotionById(id) {
  const database = await getDatabase();
  const promotion = await database.collection(promotionsCollectionName).findOne({ _id: id });
  return promotion ? {
    ...promotion,
    id: promotion._id
  } : null;
}
async function upsertPromotion(promotion) {
  const database = await getDatabase();
  const promotionId = promotion.id || promotion.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  await database.collection(promotionsCollectionName).updateOne(
    { _id: promotionId },
    {
      $set: {
        _id: promotionId,
        ...promotion,
        updatedAt: /* @__PURE__ */ new Date()
      },
      $setOnInsert: {
        createdAt: /* @__PURE__ */ new Date()
      }
    },
    { upsert: true }
  );
}
async function deletePromotion(id) {
  const database = await getDatabase();
  await database.collection(promotionsCollectionName).deleteOne({ _id: id });
}
async function getAdminByUsername(username) {
  const database = await getDatabase();
  return database.collection(adminsCollectionName).findOne({ username });
}
async function createAdminSession(sessionId, adminId, expiresAt) {
  const database = await getDatabase();
  await database.collection(adminSessionsCollectionName).updateOne(
    { _id: sessionId },
    {
      $set: {
        _id: sessionId,
        adminId,
        updatedAt: /* @__PURE__ */ new Date(),
        expiresAt
      },
      $setOnInsert: {
        createdAt: /* @__PURE__ */ new Date()
      }
    },
    { upsert: true }
  );
}
async function getAdminSession(sessionId) {
  const database = await getDatabase();
  return database.collection(adminSessionsCollectionName).findOne({ _id: sessionId });
}
async function deleteAdminSession(sessionId) {
  const database = await getDatabase();
  await database.collection(adminSessionsCollectionName).deleteOne({ _id: sessionId });
}

export { ADMIN_COOKIE_NAME as A, getPromotionById as a, getAllProducts as b, getPromotions as c, getAdminSession as d, getAdminByUsername as e, verifyAdminPassword as f, getProductById as g, createAdminSessionToken as h, createAdminSession as i, deleteAdminSession as j, deleteProduct as k, deletePromotion as l, upsertPromotion as m, upsertProduct as u, verifyAdminSession as v };

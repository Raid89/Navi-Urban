import type { ProductItem, PromotionItem } from '../types/catalog';
import { getDatabase } from './mongo';

type ProductDocument = ProductItem & {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type PromotionDocument = PromotionItem & {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type AdminDocument = {
  _id: string;
  username: string;
  passwordHash: string;
  displayName?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AdminSessionDocument = {
  _id: string;
  adminId: string;
  createdAt?: Date;
  expiresAt?: Date;
};

const productsCollectionName = 'products';
const promotionsCollectionName = 'promotions';
const adminsCollectionName = 'admins';
const adminSessionsCollectionName = 'admin_sessions';

export function normalizeProductImages(images: ProductItem['images']) {
  return images.map((image) => (typeof image === 'string' ? { url: image, publicId: '' } : image));
}

export function getProductImageUrl(image: ProductItem['images'][number] | undefined) {
  if (!image) {
    return '';
  }

  return typeof image === 'string' ? image : image.url;
}

export async function getVisibleProducts() {
  const database = await getDatabase();
  const products = await database.collection<ProductDocument>(productsCollectionName).find({ visible: true }).toArray();

  return products as ProductItem[];
}

export async function getProductById(id: string) {
  const database = await getDatabase();
  const product = await database.collection<ProductDocument>(productsCollectionName).findOne({ _id: id, visible: true });

  return product ? (product as ProductItem) : null;
}

export async function getPromotions() {
  const database = await getDatabase();
  const promotions = await database.collection<PromotionDocument>(promotionsCollectionName).find({}).toArray();

  return promotions as PromotionItem[];
}

export async function getAdminByUsername(username: string) {
  const database = await getDatabase();
  return database.collection<AdminDocument>(adminsCollectionName).findOne({ username });
}

export async function createAdminSession(sessionId: string, adminId: string, expiresAt: Date) {
  const database = await getDatabase();

  await database.collection<AdminSessionDocument>(adminSessionsCollectionName).updateOne(
    { _id: sessionId },
    {
      $set: {
        _id: sessionId,
        adminId,
        updatedAt: new Date(),
        expiresAt
      },
      $setOnInsert: {
        createdAt: new Date()
      }
    },
    { upsert: true }
  );
}

export async function getAdminSession(sessionId: string) {
  const database = await getDatabase();
  return database.collection<AdminSessionDocument>(adminSessionsCollectionName).findOne({ _id: sessionId });
}

export async function deleteAdminSession(sessionId: string) {
  const database = await getDatabase();
  await database.collection<AdminSessionDocument>(adminSessionsCollectionName).deleteOne({ _id: sessionId });
}

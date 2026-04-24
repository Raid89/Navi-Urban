import type { ProductItem, PromotionItem, ProductImageValue, OrderItem, OrderStatus } from '../types/catalog';
import { getDatabase } from './mongo';

export type ProductDocument = ProductItem & {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type PromotionDocument = PromotionItem & {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AdminDocument = {
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
  updatedAt?: Date;
  expiresAt?: Date;
};

export type OrderDocument = Omit<OrderItem, 'id' | 'createdAt' | 'updatedAt'> & {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const productsCollectionName = 'products';
const promotionsCollectionName = 'promotions';
const ordersCollectionName = 'orders';
const adminsCollectionName = 'admins';
const adminSessionsCollectionName = 'admin_sessions';

export function normalizeProductImages(images: ProductItem['images']) {
  return images.map((image) => (typeof image === 'string' ? { url: image, publicId: '' } : image));
}

export function getImageUrl(image: ProductImageValue) {
  return typeof image === 'string' ? image : image.url;
}

export function getImagePublicId(image: ProductImageValue) {
  return typeof image === 'string' ? '' : image.publicId;
}

export async function getVisibleProducts() {
  const database = await getDatabase();
  const products = await database.collection<ProductDocument>(productsCollectionName).find({ visible: true }).toArray();

  return products as ProductItem[];
}

export async function getProductById(id: string) {
  const database = await getDatabase();
  const product = await database.collection<ProductDocument>(productsCollectionName).findOne({ _id: id });

  return product ? (product as ProductItem) : null;
}

export async function getAllProducts() {
  const database = await getDatabase();
  const products = await database.collection<ProductDocument>(productsCollectionName).find({}).sort({ updatedAt: -1, createdAt: -1 }).toArray();

  return products as ProductItem[];
}

export async function upsertProduct(product: ProductItem) {
  const database = await getDatabase();
  await database.collection<ProductDocument>(productsCollectionName).updateOne(
    { _id: product.id },
    {
      $set: {
        _id: product.id,
        ...product,
        images: normalizeProductImages(product.images),
        updatedAt: new Date()
      },
      $setOnInsert: {
        createdAt: new Date()
      }
    },
    { upsert: true }
  );
}

export async function deleteProduct(id: string) {
  const database = await getDatabase();
  await database.collection<ProductDocument>(productsCollectionName).deleteOne({ _id: id });
}

export async function getPromotions() {
  const database = await getDatabase();
  const promotions = await database.collection<PromotionDocument>(promotionsCollectionName).find({}).sort({ updatedAt: -1, createdAt: -1 }).toArray();

  return promotions.map((promotion) => ({
    ...promotion,
    id: promotion._id
  })) as PromotionItem[];
}

export async function getPromotionById(id: string) {
  const database = await getDatabase();
  const promotion = await database.collection<PromotionDocument>(promotionsCollectionName).findOne({ _id: id });

  return promotion
    ? ({
        ...promotion,
        id: promotion._id
      } as PromotionItem)
    : null;
}

export async function upsertPromotion(promotion: PromotionItem) {
  const database = await getDatabase();
  const promotionId = promotion.id || promotion.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  await database.collection<PromotionDocument>(promotionsCollectionName).updateOne(
    { _id: promotionId },
    {
      $set: {
        _id: promotionId,
        ...promotion,
        updatedAt: new Date()
      },
      $setOnInsert: {
        createdAt: new Date()
      }
    },
    { upsert: true }
  );
}

export async function deletePromotion(id: string) {
  const database = await getDatabase();
  await database.collection<PromotionDocument>(promotionsCollectionName).deleteOne({ _id: id });
}

export async function createOrder(order: Omit<OrderItem, 'id' | 'status' | 'createdAt' | 'updatedAt'>) {
  const database = await getDatabase();
  const createdAt = new Date();

  const result = await database.collection<OrderDocument>(ordersCollectionName).insertOne({
    ...order,
    status: 'Tomado',
    createdAt,
    updatedAt: createdAt
  });

  return {
    id: result.insertedId.toString(),
    status: 'Tomado' as OrderStatus,
    createdAt: createdAt.toISOString()
  };
}

export async function getOrders() {
  const database = await getDatabase();
  const orders = await database.collection<OrderDocument>(ordersCollectionName).find({}).sort({ createdAt: -1 }).toArray();

  return orders.map((order) => ({
    ...order,
    id: order._id,
    createdAt: order.createdAt ? order.createdAt.toISOString() : undefined,
    updatedAt: order.updatedAt ? order.updatedAt.toISOString() : undefined
  })) as OrderItem[];
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const database = await getDatabase();
  const result = await database.collection<OrderDocument>(ordersCollectionName).updateOne(
    { _id: id },
    {
      $set: {
        status,
        updatedAt: new Date()
      }
    }
  );

  return result.matchedCount > 0;
}

export async function getAdminByUsername(username: string) {
  const database = await getDatabase();
  return database.collection<AdminDocument>(adminsCollectionName).findOne({ username });
}

export async function upsertAdmin(username: string, passwordHash: string, displayName?: string) {
  const database = await getDatabase();
  await database.collection<AdminDocument>(adminsCollectionName).updateOne(
    { username },
    {
      $set: {
        _id: username,
        username,
        passwordHash,
        displayName,
        updatedAt: new Date()
      },
      $setOnInsert: {
        createdAt: new Date()
      }
    },
    { upsert: true }
  );
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

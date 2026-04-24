import type { ProductItem, PromotionItem } from '../types/catalog';
import { getDatabase } from './mongo';

const DEFAULT_COLOR_HEX = '#bdbdbd';

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

export function getProductImageColor(image: ProductItem['images'][number] | undefined) {
  if (!image || typeof image === 'string') {
    return '';
  }

  return String(image.color || '').trim();
}

const normalizeColorKey = (value: string) => String(value || '').trim().toLowerCase();

const normalizeColorName = (value: string) => String(value || '').trim();

const normalizeColorHex = (value: string) => {
  const normalized = String(value || '').trim();
  const expanded = normalized.startsWith('#') ? normalized : `#${normalized}`;
  return /^#[0-9a-fA-F]{6}$/.test(expanded) ? expanded.toLowerCase() : DEFAULT_COLOR_HEX;
};

export function normalizeProductColors(colors: ProductItem['colors'] = [], images: ProductItem['images'] = []) {
  const byName = new Map<string, { name: string; hex: string }>();

  colors.forEach((color) => {
    if (typeof color === 'string') {
      const name = normalizeColorName(color);
      if (!name) return;
      byName.set(normalizeColorKey(name), { name, hex: DEFAULT_COLOR_HEX });
      return;
    }

    const name = normalizeColorName(color.name);
    if (!name) return;
    byName.set(normalizeColorKey(name), { name, hex: normalizeColorHex(color.hex) });
  });

  images
    .map((image) => getProductImageColor(image))
    .filter(Boolean)
    .forEach((imageColor) => {
      const name = normalizeColorName(imageColor);
      const key = normalizeColorKey(name);
      if (!key || byName.has(key)) return;
      byName.set(key, { name, hex: DEFAULT_COLOR_HEX });
    });

  return [...byName.values()];
}

export function getProductColorOptions(product: Pick<ProductItem, 'colors' | 'images'>) {
  return normalizeProductColors(product.colors || [], product.images);
}

export function getProductImagesForColor(product: Pick<ProductItem, 'images'>, color = '') {
  const normalizedColor = normalizeColorKey(color);
  const images = normalizeProductImages(product.images);

  if (!normalizedColor) {
    return images;
  }

  const filtered = images.filter((image) => {
    const imageColor = normalizeColorKey(getProductImageColor(image));
    return !imageColor || imageColor === normalizedColor;
  });

  return filtered.length ? filtered : images;
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

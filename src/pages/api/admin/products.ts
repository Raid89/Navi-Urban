import type { APIRoute } from 'astro';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '../../../lib/adminAuth';
import { deleteAdminSession, deleteProduct, getAdminSession, upsertProduct } from '../../../lib/cms';
import type { ProductColorValue, ProductItem, ProductSizeItem } from '../../../types/catalog';

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const parseJsonArray = <T>(value: FormDataEntryValue | null, fallback: T[]) => {
  if (typeof value !== 'string' || !value.trim()) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T[];
  } catch {
    return fallback;
  }
};

const normalizeColorName = (value: string) => String(value || '').trim();
const normalizeColorHex = (value: string) => {
  const normalized = String(value || '').trim();
  const expanded = normalized.startsWith('#') ? normalized : `#${normalized}`;
  return /^#[0-9a-fA-F]{6}$/.test(expanded) ? expanded.toLowerCase() : '#bdbdbd';
};

const normalizeColors = (values: ProductColorValue[]) => {
  const byName = new Map<string, { name: string; hex: string }>();

  values.forEach((value) => {
    if (typeof value === 'string') {
      const name = normalizeColorName(value);
      if (!name) return;
      byName.set(name.toLowerCase(), { name, hex: '#bdbdbd' });
      return;
    }

    const name = normalizeColorName(value.name);
    if (!name) return;
    byName.set(name.toLowerCase(), { name, hex: normalizeColorHex(value.hex) });
  });

  return [...byName.values()];
};

const buildProduct = (formData: FormData): ProductItem => {
  const name = String(formData.get('name') || '').trim();
  const id = String(formData.get('id') || '').trim() || slugify(name);

  return {
    id,
    name,
    category: String(formData.get('category') || '').trim(),
    description: String(formData.get('description') || '').trim(),
    price: Number(formData.get('price') || 0),
    currency: 'MXN',
    tag: String(formData.get('tag') || '').trim(),
    isPromotion: formData.get('isPromotion') === 'on',
    visible: formData.get('visible') === 'on',
    colors: normalizeColors(parseJsonArray<ProductColorValue>(formData.get('colorsJson'), [])),
    images: parseJsonArray(formData.get('imagesJson'), []),
    sizes: parseJsonArray<ProductSizeItem>(formData.get('sizesJson'), [])
  };
};

const requireAdmin = async (cookies: { get: (name: string) => { value: string } | undefined }) => {
  const token = cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const sessionId = verifyAdminSession(token);

  if (!sessionId) {
    return null;
  }

  const session = await getAdminSession(sessionId);

  if (!session || !session.expiresAt || session.expiresAt < new Date()) {
    if (sessionId) {
      await deleteAdminSession(sessionId);
    }

    return null;
  }

  return session;
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const session = await requireAdmin(cookies);

  if (!session) {
    return Response.redirect(new URL('/admin?error=unauthorized', request.url), 302);
  }

  const formData = await request.formData();
  await upsertProduct(buildProduct(formData));
  return Response.redirect(new URL(`/admin?product=${String(formData.get('id') || '') || slugify(String(formData.get('name') || ''))}`, request.url), 302);
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  const session = await requireAdmin(cookies);

  if (!session) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
  }

  const body = await request.json() as { id?: string };

  if (!body.id) {
    return new Response(JSON.stringify({ error: 'missing_id' }), { status: 400 });
  }

  await deleteProduct(body.id);
  return new Response(JSON.stringify({ ok: true }));
};

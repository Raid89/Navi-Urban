import type { APIRoute } from 'astro';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '../../../lib/adminAuth';
import { deletePromotion, getAdminSession, upsertPromotion } from '../../../lib/cms';
import type { PromotionItem } from '../../../types/catalog';

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const requireAdmin = async (cookies: { get: (name: string) => { value: string } | undefined }) => {
  const token = cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const sessionId = verifyAdminSession(token);

  if (!sessionId) {
    return null;
  }

  return getAdminSession(sessionId);
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const session = await requireAdmin(cookies);

  if (!session || session.expiresAt < new Date()) {
    return Response.redirect(new URL('/admin?error=unauthorized', request.url), 302);
  }

  const formData = await request.formData();
  const title = String(formData.get('title') || '').trim();
  const redirect = String(formData.get('redirect') || '').trim();
  const promotion: PromotionItem = {
    id: String(formData.get('id') || '').trim() || slugify(title),
    title,
    description: String(formData.get('description') || '').trim(),
    redirect
  };

  await upsertPromotion(promotion);
  return Response.redirect(new URL(`/admin?promotion=${promotion.id || slugify(title)}`, request.url), 302);
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  const session = await requireAdmin(cookies);

  if (!session || session.expiresAt < new Date()) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
  }

  const body = await request.json() as { id?: string };

  if (!body.id) {
    return new Response(JSON.stringify({ error: 'missing_id' }), { status: 400 });
  }

  await deletePromotion(body.id);
  return new Response(JSON.stringify({ ok: true }));
};

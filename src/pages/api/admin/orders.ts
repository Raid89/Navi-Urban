import type { APIRoute } from 'astro';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '../../../lib/adminAuth';
import { deleteAdminSession, getAdminSession, updateOrderStatus } from '../../../lib/cms';
import type { OrderStatus } from '../../../types/catalog';

const allowedStatuses: OrderStatus[] = ['Tomado', 'Enviado', 'Entregado'];

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

export const PATCH: APIRoute = async ({ request, cookies }) => {
  const session = await requireAdmin(cookies);

  if (!session) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
  }

  const body = (await request.json()) as { id?: string; status?: string };

  const id = String(body.id || '').trim();
  const status = String(body.status || '').trim() as OrderStatus;

  if (!id || !allowedStatuses.includes(status)) {
    return new Response(JSON.stringify({ error: 'invalid_payload' }), { status: 400 });
  }

  const updated = await updateOrderStatus(id, status);

  if (!updated) {
    return new Response(JSON.stringify({ error: 'not_found' }), { status: 404 });
  }

  return new Response(JSON.stringify({ ok: true }));
};

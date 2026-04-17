import type { APIRoute } from 'astro';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '../../../lib/adminAuth';
import { deleteAdminSession } from '../../../lib/cms';

export const POST: APIRoute = async ({ request, cookies }) => {
  const token = cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (token) {
    const sessionId = verifyAdminSession(token);

    if (sessionId) {
      await deleteAdminSession(sessionId);
    }
  }

  cookies.delete(ADMIN_COOKIE_NAME, { path: '/' });
  return Response.redirect(new URL('/admin', request.url), 302);
};

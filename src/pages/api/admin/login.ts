import type { APIRoute } from 'astro';
import { ADMIN_COOKIE_NAME, createAdminSessionToken, verifyAdminPassword } from '../../../lib/adminAuth';
import { createAdminSession, getAdminByUsername } from '../../../lib/cms';

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const username = String(formData.get('username') || '').trim();
  const password = String(formData.get('password') || '');

  if (!username || !password) {
    return Response.redirect(new URL('/admin?error=missing_credentials', request.url), 302);
  }

  const admin = await getAdminByUsername(username);

  if (!admin || !verifyAdminPassword(password, admin.passwordHash)) {
    return Response.redirect(new URL('/admin?error=invalid_credentials', request.url), 302);
  }

  const { sessionId, token } = createAdminSessionToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  await createAdminSession(sessionId, admin.username, expiresAt);
  cookies.set(ADMIN_COOKIE_NAME, token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    expires: expiresAt
  });

  return Response.redirect(new URL('/admin', request.url), 302);
};

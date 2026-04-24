import type { APIRoute } from 'astro';
import { ADMIN_COOKIE_NAME, createAdminSessionToken, verifyAdminPassword } from '../../../lib/adminAuth';
import { createAdminSession, getAdminByUsername } from '../../../lib/cms';

const redirectTo = (request: Request, path: string) =>
  new Response(null, {
    status: 302,
    headers: {
      Location: new URL(path, request.url).toString()
    }
  });

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const username = String(formData.get('username') || '').trim();
  const password = String(formData.get('password') || '');

  if (!username || !password) {
    return redirectTo(request, '/admin?error=missing_credentials');
  }

  const admin = await getAdminByUsername(username);

  if (!admin || !verifyAdminPassword(password, admin.passwordHash)) {
    return redirectTo(request, '/admin?error=invalid_credentials');
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

  return redirectTo(request, '/admin');
};

import { ADMIN_COOKIE_NAME, verifyAdminSession } from './adminAuth';
import { getAdminByUsername, getAdminSession } from './cms';

interface CookieStoreLike {
  get(name: string): { value: string } | undefined;
}

export async function getAuthenticatedAdmin(cookieStore: CookieStoreLike) {
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const sessionId = verifyAdminSession(token);

  if (!sessionId) {
    return null;
  }

  const session = await getAdminSession(sessionId);

  if (!session || !session.expiresAt || session.expiresAt < new Date()) {
    return null;
  }

  const admin = await getAdminByUsername(session.adminId);

  if (!admin) {
    return null;
  }

  return { admin, session };
}

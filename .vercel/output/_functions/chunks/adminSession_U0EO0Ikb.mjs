import { A as ADMIN_COOKIE_NAME, v as verifyAdminSession, d as getAdminSession, e as getAdminByUsername } from './cms_DALIUrFy.mjs';

async function getAuthenticatedAdmin(cookieStore) {
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }
  const sessionId = verifyAdminSession(token);
  if (!sessionId) {
    return null;
  }
  const session = await getAdminSession(sessionId);
  if (!session || !session.expiresAt || session.expiresAt < /* @__PURE__ */ new Date()) {
    return null;
  }
  const admin = await getAdminByUsername(session.adminId);
  if (!admin) {
    return null;
  }
  return { admin, session };
}

export { getAuthenticatedAdmin as g };

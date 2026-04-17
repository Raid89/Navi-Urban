import { e as getAdminByUsername, f as verifyAdminPassword, h as createAdminSessionToken, i as createAdminSession, A as ADMIN_COOKIE_NAME } from './cms_BhVNdxc6.mjs';

const POST = async ({ request, cookies }) => {
  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  if (!username || !password) {
    return Response.redirect(new URL("/admin?error=missing_credentials", request.url), 302);
  }
  const admin = await getAdminByUsername(username);
  if (!admin || !verifyAdminPassword(password, admin.passwordHash)) {
    return Response.redirect(new URL("/admin?error=invalid_credentials", request.url), 302);
  }
  const { sessionId, token } = createAdminSessionToken();
  const expiresAt = new Date(Date.now() + 1e3 * 60 * 60 * 24 * 7);
  await createAdminSession(sessionId, admin.username, expiresAt);
  cookies.set(ADMIN_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    expires: expiresAt
  });
  return Response.redirect(new URL("/admin", request.url), 302);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

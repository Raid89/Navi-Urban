import { A as ADMIN_COOKIE_NAME, v as verifyAdminSession, j as deleteAdminSession } from './cms_DALIUrFy.mjs';

const POST = async ({ request, cookies }) => {
  const token = cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (token) {
    const sessionId = verifyAdminSession(token);
    if (sessionId) {
      await deleteAdminSession(sessionId);
    }
  }
  cookies.delete(ADMIN_COOKIE_NAME, { path: "/" });
  return Response.redirect(new URL("/admin", request.url), 302);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { l as deletePromotion, m as upsertPromotion, A as ADMIN_COOKIE_NAME, v as verifyAdminSession, d as getAdminSession } from './cms_DALIUrFy.mjs';

const slugify = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const requireAdmin = async (cookies) => {
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
const POST = async ({ request, cookies }) => {
  const session = await requireAdmin(cookies);
  if (!session || session.expiresAt < /* @__PURE__ */ new Date()) {
    return Response.redirect(new URL("/admin?error=unauthorized", request.url), 302);
  }
  const formData = await request.formData();
  const title = String(formData.get("title") || "").trim();
  const redirect = String(formData.get("redirect") || "").trim();
  const promotion = {
    id: String(formData.get("id") || "").trim() || slugify(title),
    title,
    description: String(formData.get("description") || "").trim(),
    redirect
  };
  await upsertPromotion(promotion);
  return Response.redirect(new URL(`/admin?promotion=${promotion.id || slugify(title)}`, request.url), 302);
};
const DELETE = async ({ request, cookies }) => {
  const session = await requireAdmin(cookies);
  if (!session || session.expiresAt < /* @__PURE__ */ new Date()) {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  }
  const body = await request.json();
  if (!body.id) {
    return new Response(JSON.stringify({ error: "missing_id" }), { status: 400 });
  }
  await deletePromotion(body.id);
  return new Response(JSON.stringify({ ok: true }));
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

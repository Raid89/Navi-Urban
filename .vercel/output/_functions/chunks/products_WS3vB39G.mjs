import { k as deleteProduct, u as upsertProduct, A as ADMIN_COOKIE_NAME, v as verifyAdminSession, d as getAdminSession, j as deleteAdminSession } from './cms_BhVNdxc6.mjs';

const slugify = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const parseJsonArray = (value, fallback) => {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};
const buildProduct = (formData) => {
  const name = String(formData.get("name") || "").trim();
  const id = String(formData.get("id") || "").trim() || slugify(name);
  return {
    id,
    name,
    category: String(formData.get("category") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    price: Number(formData.get("price") || 0),
    currency: "MXN",
    tag: String(formData.get("tag") || "").trim(),
    isPromotion: formData.get("isPromotion") === "on",
    visible: formData.get("visible") === "on",
    images: parseJsonArray(formData.get("imagesJson"), []),
    sizes: parseJsonArray(formData.get("sizesJson"), [])
  };
};
const requireAdmin = async (cookies) => {
  const token = cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }
  const sessionId = verifyAdminSession(token);
  if (!sessionId) {
    return null;
  }
  const session = await getAdminSession(sessionId);
  if (!session || session.expiresAt < /* @__PURE__ */ new Date()) {
    if (sessionId) {
      await deleteAdminSession(sessionId);
    }
    return null;
  }
  return session;
};
const POST = async ({ request, cookies }) => {
  const session = await requireAdmin(cookies);
  if (!session) {
    return Response.redirect(new URL("/admin?error=unauthorized", request.url), 302);
  }
  const formData = await request.formData();
  await upsertProduct(buildProduct(formData));
  return Response.redirect(new URL(`/admin?product=${String(formData.get("id") || "") || slugify(String(formData.get("name") || ""))}`, request.url), 302);
};
const DELETE = async ({ request, cookies }) => {
  const session = await requireAdmin(cookies);
  if (!session) {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  }
  const body = await request.json();
  if (!body.id) {
    return new Response(JSON.stringify({ error: "missing_id" }), { status: 400 });
  }
  await deleteProduct(body.id);
  return new Response(JSON.stringify({ ok: true }));
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

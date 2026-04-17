import { c as createComponent } from './astro-component_BlIEIJJi.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead } from './entrypoint_CPTBTH47.mjs';
import { $ as $$BaseLayout, a as $$Navbar, b as $$SiteFooter } from './SiteFooter_B4Bag8KI.mjs';
import { $ as $$ProductEditorForm } from './ProductEditorForm_OrUg3ATO.mjs';
import { g as getAuthenticatedAdmin } from './adminSession_CoPYRdow.mjs';
import { g as getProductById } from './cms_BhVNdxc6.mjs';

const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Edit;
  const auth = await getAuthenticatedAdmin(Astro2.cookies);
  if (!auth) {
    return Astro2.redirect("/admin?error=unauthorized");
  }
  const productId = Astro2.params.id;
  const product = productId ? await getProductById(productId) : null;
  if (!product) {
    throw new Response("Producto no encontrado", { status: 404 });
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Editar ${product.name} | NAVI URBAN Admin`, "description": "Editar producto en CMS de NAVI URBAN.", "data-astro-cid-szrm7557": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "data-astro-cid-szrm7557": true })} ${maybeRenderHead()}<main class="wrapper admin-page" data-astro-cid-szrm7557> ${renderComponent($$result2, "ProductEditorForm", $$ProductEditorForm, { "product": product, "title": `Editar ${product.name}`, "subtitle": "Productos", "submitLabel": "Guardar cambios", "cancelHref": "/admin?view=products", "data-astro-cid-szrm7557": true })} </main> ${renderComponent($$result2, "SiteFooter", $$SiteFooter, { "data-astro-cid-szrm7557": true })} ` })}`;
}, "D:/Desarrollos/Astro/navi-urban/src/pages/admin/products/[id]/edit.astro", void 0);

const $$file = "D:/Desarrollos/Astro/navi-urban/src/pages/admin/products/[id]/edit.astro";
const $$url = "/admin/products/[id]/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

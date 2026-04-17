import { c as createComponent } from './astro-component_M2H6Wz8D.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead } from './entrypoint_DJpBiLpZ.mjs';
import { $ as $$BaseLayout, a as $$Navbar, b as $$SiteFooter } from './SiteFooter_D0yC0Wcp.mjs';
import { $ as $$ProductEditorForm } from './ProductEditorForm_BpGg0ff7.mjs';
import { g as getAuthenticatedAdmin } from './adminSession_U0EO0Ikb.mjs';

const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$New;
  const auth = await getAuthenticatedAdmin(Astro2.cookies);
  if (!auth) {
    return Astro2.redirect("/admin?error=unauthorized");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Nuevo Producto | NAVI URBAN Admin", "description": "Crear nuevo producto en CMS de NAVI URBAN.", "data-astro-cid-unfxests": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "data-astro-cid-unfxests": true })} ${maybeRenderHead()}<main class="wrapper admin-page" data-astro-cid-unfxests> ${renderComponent($$result2, "ProductEditorForm", $$ProductEditorForm, { "title": "Nuevo producto", "subtitle": "Productos", "submitLabel": "Crear producto", "cancelHref": "/admin?view=products", "data-astro-cid-unfxests": true })} </main> ${renderComponent($$result2, "SiteFooter", $$SiteFooter, { "data-astro-cid-unfxests": true })} ` })}`;
}, "D:/Desarrollos/Astro/navi-urban/src/pages/admin/products/new.astro", void 0);

const $$file = "D:/Desarrollos/Astro/navi-urban/src/pages/admin/products/new.astro";
const $$url = "/admin/products/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

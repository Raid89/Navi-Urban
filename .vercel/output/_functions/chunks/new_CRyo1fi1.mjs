import { c as createComponent } from './astro-component_BlIEIJJi.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead } from './entrypoint_CPTBTH47.mjs';
import { $ as $$BaseLayout, a as $$Navbar, b as $$SiteFooter } from './SiteFooter_B4Bag8KI.mjs';
import { $ as $$PromotionEditorForm } from './PromotionEditorForm_D-CmUuCp.mjs';
import { g as getAuthenticatedAdmin } from './adminSession_CoPYRdow.mjs';

const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$New;
  const auth = await getAuthenticatedAdmin(Astro2.cookies);
  if (!auth) {
    return Astro2.redirect("/admin?error=unauthorized");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Nueva Promocion | NAVI URBAN Admin", "description": "Crear nueva promocion en CMS de NAVI URBAN.", "data-astro-cid-t734nlns": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "data-astro-cid-t734nlns": true })} ${maybeRenderHead()}<main class="wrapper admin-page" data-astro-cid-t734nlns> ${renderComponent($$result2, "PromotionEditorForm", $$PromotionEditorForm, { "title": "Nueva promocion", "subtitle": "Promociones", "submitLabel": "Crear promocion", "cancelHref": "/admin?view=promotions", "data-astro-cid-t734nlns": true })} </main> ${renderComponent($$result2, "SiteFooter", $$SiteFooter, { "data-astro-cid-t734nlns": true })} ` })}`;
}, "D:/Desarrollos/Astro/navi-urban/src/pages/admin/promotions/new.astro", void 0);

const $$file = "D:/Desarrollos/Astro/navi-urban/src/pages/admin/promotions/new.astro";
const $$url = "/admin/promotions/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

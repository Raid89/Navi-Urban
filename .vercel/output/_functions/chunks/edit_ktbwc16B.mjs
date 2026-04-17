import { c as createComponent } from './astro-component_BlIEIJJi.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead } from './entrypoint_CPTBTH47.mjs';
import { $ as $$BaseLayout, a as $$Navbar, b as $$SiteFooter } from './SiteFooter_B4Bag8KI.mjs';
import { $ as $$PromotionEditorForm } from './PromotionEditorForm_D-CmUuCp.mjs';
import { g as getAuthenticatedAdmin } from './adminSession_CoPYRdow.mjs';
import { a as getPromotionById } from './cms_BhVNdxc6.mjs';

const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Edit;
  const auth = await getAuthenticatedAdmin(Astro2.cookies);
  if (!auth) {
    return Astro2.redirect("/admin?error=unauthorized");
  }
  const promotionId = Astro2.params.id;
  const promotion = promotionId ? await getPromotionById(promotionId) : null;
  if (!promotion) {
    throw new Response("Promocion no encontrada", { status: 404 });
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Editar ${promotion.title} | NAVI URBAN Admin`, "description": "Editar promocion en CMS de NAVI URBAN.", "data-astro-cid-niyymxvr": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "data-astro-cid-niyymxvr": true })} ${maybeRenderHead()}<main class="wrapper admin-page" data-astro-cid-niyymxvr> ${renderComponent($$result2, "PromotionEditorForm", $$PromotionEditorForm, { "promotion": promotion, "title": `Editar ${promotion.title}`, "subtitle": "Promociones", "submitLabel": "Guardar cambios", "cancelHref": "/admin?view=promotions", "data-astro-cid-niyymxvr": true })} </main> ${renderComponent($$result2, "SiteFooter", $$SiteFooter, { "data-astro-cid-niyymxvr": true })} ` })}`;
}, "D:/Desarrollos/Astro/navi-urban/src/pages/admin/promotions/[id]/edit.astro", void 0);

const $$file = "D:/Desarrollos/Astro/navi-urban/src/pages/admin/promotions/[id]/edit.astro";
const $$url = "/admin/promotions/[id]/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

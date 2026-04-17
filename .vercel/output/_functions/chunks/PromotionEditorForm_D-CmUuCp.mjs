import { c as createComponent } from './astro-component_BlIEIJJi.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './entrypoint_CPTBTH47.mjs';
import 'clsx';
import { r as renderScript } from './SiteFooter_B4Bag8KI.mjs';

const $$PromotionEditorForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PromotionEditorForm;
  const { promotion = null, title, subtitle, submitLabel, cancelHref } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="editor-card" data-astro-cid-qxm7hgwa> <div class="editor-head" data-astro-cid-qxm7hgwa> <div data-astro-cid-qxm7hgwa> <p class="eyebrow" data-astro-cid-qxm7hgwa>${subtitle}</p> <h1 data-astro-cid-qxm7hgwa>${title}</h1> </div> <a class="btn btn-ghost"${addAttribute(cancelHref, "href")} data-astro-cid-qxm7hgwa>Volver</a> </div> <form method="post" action="/api/admin/promotions" class="editor-form" id="promotionForm" data-astro-cid-qxm7hgwa> <input type="hidden" name="id"${addAttribute(promotion?.id || "", "value")} data-astro-cid-qxm7hgwa> <label data-astro-cid-qxm7hgwa>
Titulo
<input name="title"${addAttribute(promotion?.title || "", "value")} placeholder="Running Essentials -25%" required data-astro-cid-qxm7hgwa> </label> <label data-astro-cid-qxm7hgwa>
Descripcion
<textarea name="description" rows="4" required data-astro-cid-qxm7hgwa>${promotion?.description || ""}</textarea> </label> <label data-astro-cid-qxm7hgwa>
Redireccion
<input name="redirect"${addAttribute(promotion?.redirect || "", "value")} placeholder="#catalogo" required data-astro-cid-qxm7hgwa> </label> <button class="btn btn-main" type="submit" id="promotionSubmitButton"${addAttribute(submitLabel, "data-default-label")} data-astro-cid-qxm7hgwa>${submitLabel}</button> </form> </article> ${renderScript($$result, "D:/Desarrollos/Astro/navi-urban/src/components/admin/PromotionEditorForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Desarrollos/Astro/navi-urban/src/components/admin/PromotionEditorForm.astro", void 0);

export { $$PromotionEditorForm as $ };
